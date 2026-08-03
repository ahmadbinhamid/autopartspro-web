/* ============================================================
   chat.js — live chat assistant

   This is a scripted assistant, not an LLM. Its knowledge base is
   built at runtime from the page's OWN content (the FAQ entries and
   the feature tab panels), so an answer can never contradict what
   the site says — edit the FAQ and the bot follows automatically.

   Anything it cannot answer is handed off to the demo form rather
   than guessed at. No contact details are collected in the widget
   itself; that stays in the real form on the page.
   ============================================================ */
(function () {
  'use strict';

  var launcher = document.getElementById('chatLauncher');
  var panel = document.getElementById('chatPanel');
  var log = document.getElementById('chatLog');
  var form = document.getElementById('chatForm');
  var input = document.getElementById('chatInput');
  var chips = document.getElementById('chatChips');
  var closeBtn = document.getElementById('chatClose');
  if (!launcher || !panel || !log || !form || !input) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STORE = 'apw-chat-v1';

  /* ---------------------------------------------------------
     Knowledge base, scraped from the live DOM
     --------------------------------------------------------- */
  var STOP = ('a an and any are as at be but by can could did do does doing for from get got has have how i if in into is it its me my need of on or our so some tell than that the their them then there these they this to up us use want was we what when where which who will with you your'
  ).split(' ');

  function tokens(str) {
    return String(str)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(function (w) { return w && w.length > 1 && STOP.indexOf(w) === -1; })
      .map(function (w) { return w.replace(/(ies)$/, 'y').replace(/s$/, ''); });
  }

  var kb = [];

  /* titleBoost holds extra wording that names the topic as strongly as
     the heading does (a tab label, the bullet names). Those live in the
     body text, where they'd only score 1 — too low to clear the
     coverage guard for a question like "analytics and reporting". */
  function addEntry(title, answer, keys, jump, titleBoost) {
    if (!answer) return;
    kb.push({
      title: title,
      answer: answer,
      jump: jump || null,
      keys: keys || [],
      titleTokens: tokens(title + ' ' + (titleBoost || '')),
      tokens: tokens(title + ' ' + answer + ' ' + (keys || []).join(' ') + ' ' + (titleBoost || ''))
    });
  }

  // 1. FAQ entries — join every paragraph/bullet so longer answers
  //    aren't silently truncated to their first sentence.
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    var parts = [].map.call(item.querySelectorAll('.faq-a p, .faq-a li'), function (n) {
      return n.textContent.trim();
    }).filter(Boolean);
    if (!parts.length) return;
    var label = q.textContent.replace(/\+\s*$/, '').trim();
    addEntry(label, parts.join(' '), [], '#faq', label);
  });

  // 2. Feature cards
  document.querySelectorAll('.feature-card').forEach(function (card) {
    var h = card.querySelector('h3');
    var lead = card.querySelector('.fc-lead');
    if (!h || !lead) return;
    var bullets = [].map.call(card.querySelectorAll('.feature-list li strong'), function (s) {
      return s.textContent.trim();
    });
    var body = lead.textContent.trim();
    if (bullets.length) body += ' Includes: ' + bullets.join(', ') + '.';
    // Bullet names identify the topic as well as the heading does, so
    // weight them like a title.
    addEntry(h.textContent.trim(), body, [], '#features', bullets.join(' '));
  });

  // 3. "How it works" steps
  var stepCards = document.querySelectorAll('.step-card');
  if (stepCards.length) {
    var steps = [].map.call(stepCards, function (card, i) {
      var h = card.querySelector('h3');
      var p = card.querySelector('p');
      return (i + 1) + '. ' + (h ? h.textContent.trim() : '') +
             (p ? ' — ' + p.textContent.trim() : '');
    });
    addEntry('How it works',
      'Three steps: ' + steps.join(' '),
      ['how does it work', 'how it works', 'how do i start', 'getting started',
       'onboarding', 'setup process', 'how does it actually work'], '#showcase',
      'how it works setup steps getting started');
  }

  // 3. Curated answers for things the page deliberately doesn't state
  addEntry('Pricing',
    "Pricing isn't published on the site — it depends on catalogue size and how many channels you sell on. The quickest way to get a number is a 30-minute walkthrough, and I can take you to the form now.",
    ['price', 'pricing', 'cost', 'how much', 'quote', 'plan', 'fee', 'subscription'], '#demo-section');

  addEntry('Book a demo',
    "Happy to help — the demo is a 30-minute walkthrough on your own catalogue, with no commitment. I'll scroll you to the form.",
    ['demo', 'book', 'walkthrough', 'trial', 'call', 'meeting', 'sign up', 'get started'], '#demo-section');

  addEntry('Talk to a person',
    "Of course. Fill in the demo form and a real onboarding specialist follows up within one business day — that's a person, not an autoresponder.",
    ['human', 'person', 'someone', 'agent', 'sales', 'contact', 'talk', 'speak', 'phone', 'email'], '#demo-section');

  addEntry('How many sellers use it',
    'Around 120 auto parts sellers run on Auto Parts Pro, syncing roughly 180,000 orders a month between them, at 99.9% platform uptime. We are deliberately growing carefully so onboarding stays hands-on.',
    ['how many seller', 'how many customer', 'how many user', 'how many business', 'how big', 'customer base'], '#scale-proof');

  addEntry('Integrations',
    'Auto Parts Pro connects to eBay, Amazon, Shopify, WooCommerce, Gumtree, Facebook Marketplace, Meta Shops, Google Shopping, and your own website.',
    ['integration', 'channel', 'marketplace', 'connect', 'platform', 'ebay', 'amazon', 'shopify', 'woocommerce', 'gumtree', 'facebook', 'google', 'meta'], '#showcase');

  /* ---------------------------------------------------------
     Matching
     --------------------------------------------------------- */
  function bestMatch(text) {
    var q = tokens(text);
    if (!q.length) return null;
    var low = ' ' + text.toLowerCase() + ' ';
    var best = null, bestScore = 0, bestCoverage = 0;

    kb.forEach(function (e) {
      var s = 0, matched = 0;
      q.forEach(function (w) {
        if (e.tokens.indexOf(w) !== -1) { s += 1; matched++; }
        // Favour a title hit — it's the strongest signal of intent
        if (e.titleTokens.indexOf(w) !== -1) s += 1.5;
      });
      e.keys.forEach(function (k) {
        if (k && low.indexOf(k) !== -1) { s += 3; matched++; }
      });
      if (s > bestScore) {
        bestScore = s;
        bestCoverage = Math.min(1, matched / q.length);
        best = e;
      }
    });

    /* Coverage guard: score alone lets one generic word ("support",
       "order") drag in a confident but wrong answer. Require that a
       reasonable share of the question actually matched — otherwise
       hand off rather than guess. */
    return (bestScore >= 2.5 && bestCoverage >= 0.34) ? best : null;
  }

  var GREET = /\b(hi|hey|hello|yo|good (morning|afternoon|evening))\b/i;
  var THANKS = /\b(thanks|thank you|cheers|ta)\b/i;
  var BYE = /\b(bye|goodbye|see you|later)\b/i;

  function answerFor(text) {
    if (GREET.test(text) && tokens(text).length <= 3) {
      return { text: "Hi! I can answer questions about syncing, orders, fitment data, warehouses, integrations or pricing. What would you like to know?" };
    }
    if (THANKS.test(text)) return { text: "Any time. Anything else I can dig out for you?" };
    if (BYE.test(text)) return { text: "Thanks for stopping by — the demo form is here whenever you want it." };

    var m = bestMatch(text);
    if (m) return { text: m.answer, jump: m.jump, jumpLabel: m.jump === '#demo-section' ? 'Book a demo' : 'Show me on the page' };

    return {
      text: "I don't want to guess at that one. A specialist can answer it properly on a 30-minute walkthrough — shall I take you to the form?",
      jump: '#demo-section',
      jumpLabel: 'Book a demo'
    };
  }

  /* ---------------------------------------------------------
     Rendering
     --------------------------------------------------------- */
  var history = [];

  function persist() {
    try { sessionStorage.setItem(STORE, JSON.stringify(history.slice(-40))); } catch (e) {}
  }

  function bubble(role, text, jump, jumpLabel) {
    var row = document.createElement('div');
    row.className = 'chat-msg chat-msg-' + role;

    var body = document.createElement('div');
    body.className = 'chat-bubble';
    body.textContent = text;
    row.appendChild(body);

    if (jump) {
      var link = document.createElement('a');
      link.className = 'chat-jump';
      link.href = jump;
      link.textContent = jumpLabel || 'Take me there';
      link.addEventListener('click', function () { close(); });
      body.appendChild(link);
    }

    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }

  function say(role, text, jump, jumpLabel, skipStore) {
    bubble(role, text, jump, jumpLabel);
    if (!skipStore) { history.push({ r: role, t: text, j: jump, l: jumpLabel }); persist(); }
  }

  function typing() {
    var row = document.createElement('div');
    row.className = 'chat-msg chat-msg-bot chat-typing';
    row.innerHTML = '<div class="chat-bubble"><span></span><span></span><span></span></div>';
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }

  function respond(text) {
    var a = answerFor(text);
    if (reduce) { say('bot', a.text, a.jump, a.jumpLabel); return; }
    var t = typing();
    setTimeout(function () {
      t.remove();
      say('bot', a.text, a.jump, a.jumpLabel);
    }, Math.min(1100, 380 + text.length * 12));
  }

  /* ---------------------------------------------------------
     Open / close
     --------------------------------------------------------- */
  var lastFocus = null;

  function open() {
    lastFocus = document.activeElement;
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    launcher.classList.add('is-open');
    // let the panel paint before animating in
    requestAnimationFrame(function () { panel.classList.add('is-open'); });
    if (!history.length) {
      say('bot', "Hi — I'm the Auto Parts Pro assistant. Ask me about marketplace sync, orders, vehicle fitment, warehouses or pricing.");
    }
    setTimeout(function () { input.focus(); }, reduce ? 0 : 180);
  }

  function close() {
    panel.classList.remove('is-open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.classList.remove('is-open');
    var done = function () { panel.hidden = true; };
    if (reduce) done(); else setTimeout(done, 220);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  launcher.addEventListener('click', function () {
    if (panel.hidden) open(); else close();
  });
  if (closeBtn) closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) { e.preventDefault(); close(); }
  });

  /* ---------------------------------------------------------
     Input
     --------------------------------------------------------- */
  function send(text) {
    text = String(text || '').trim();
    if (!text) return;
    say('user', text);
    input.value = '';
    respond(text);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    send(input.value);
  });

  if (chips) {
    chips.addEventListener('click', function (e) {
      var btn = e.target.closest('.chat-chip');
      if (!btn) return;
      send(btn.dataset.q || btn.textContent);
    });
  }

  /* ---------------------------------------------------------
     Restore transcript within the session
     --------------------------------------------------------- */
  try {
    var saved = JSON.parse(sessionStorage.getItem(STORE) || '[]');
    if (saved.length) {
      history = saved;
      saved.forEach(function (m) { bubble(m.r, m.t, m.j, m.l); });
    }
  } catch (e) {}

})();
