/* ============================================================
   animations.js — scroll motion

   Two rules this file exists to enforce:

   1. VISIBILITY. An element is only put into a hidden "from"
      state if it is BELOW the fold at init. Anything already on
      screen animates in place. A watchdog then force-reveals
      anything still hidden while inside the viewport.

   2. PIN ORDER. Every pinned ScrollTrigger is created FIRST, in
      document order, with a descending refreshPriority. Each pin
      inserts a spacer that pushes everything below it further
      down the page; a pin created before an earlier-in-document
      pin caches a start position that is then wrong by the size
      of that spacer, and fires early — which shows up as one
      section sliding over the previous one. Creating pins in
      document order with refreshPriority set, then refreshing
      once at the end, keeps every start position honest.
   ============================================================ */
(function () {
  'use strict';

  var els = document.querySelectorAll('.anim');

  // No GSAP / reduced motion => leave the page exactly as authored
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', overwrite: 'auto' });

  var isMobile = window.innerWidth < 769;
  var VH = window.innerHeight;
  var EASE = 'power3.out';

  /* ============================================================
     STEP 1 — PINS, in document order, highest priority first.
     Nothing else may be created before these.
     ============================================================ */
  if (!isMobile) {
    // Pinned sections listed top-to-bottom exactly as they appear
    // in index.html. Order here is load-bearing.
    var PINS = ['hero', 'solution', 'scale', 'cta'];
    var priority = PINS.length;   // descending: earlier section = higher

    PINS.forEach(function (name) {
      var sec = name === 'hero'
        ? document.querySelector('.hero-section')
        : document.querySelector('[data-pin="' + name + '"]');
      if (!sec) { priority--; return; }

      var prio = priority--;

      if (name === 'hero') {
        /* Scope every target to the hero element. `.hero-eyebrow` is
           reused by the demo section further down the page, so a bare
           selector string here would fade that one out too. */
        var hTitle = sec.querySelector('.hero-title');
        var hCue   = sec.querySelector('.scroll-cue');
        var hBits  = [
          sec.querySelector('.hero-eyebrow'),
          sec.querySelector('.hero-sub'),
          sec.querySelector('.hero-actions')
        ].filter(Boolean);

        gsap.timeline({
          scrollTrigger: {
            trigger: sec, start: 'top top', end: '+=90%',
            pin: true, scrub: 0.7, refreshPriority: prio
          }
        })
          .to(hTitle, { scale: 1.1, ease: 'none', duration: 0.5 }, 0)
          .to(hCue, { autoAlpha: 0, duration: 0.2 }, 0)
          .to(hBits, { y: -40, autoAlpha: 0, duration: 0.35 }, 0.25)
          .to(hTitle, { y: -70, autoAlpha: 0, duration: 0.4 }, 0.5);
        return;
      }

      // Text-only pinned sections: scale the heading, never fade it
      var ends = { solution: '+=65%', scale: '+=70%', cta: '+=55%' };
      var h2 = sec.querySelector('h2');
      if (!h2) return;
      gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: 'top top', end: ends[name] || '+=60%',
          pin: true, scrub: 0.6, refreshPriority: prio
        }
      })
        .fromTo(h2, { scale: 0.82 }, { scale: 1, ease: 'none', duration: 0.6 }, 0)
        .to(h2, { scale: 1.04, ease: 'none', duration: 0.4 }, 0.6);
    });
  }

  /* ============================================================
     STEP 2 — reveals. Created after pins so their trigger
     positions are measured against the final page height.
     ============================================================ */

  function reveal(el, opts) {
    if (!el) return;
    opts = opts || {};

    var from = { autoAlpha: 0 };
    from.y = opts.y !== undefined ? opts.y : 26;
    if (opts.x !== undefined) from.x = opts.x;
    if (opts.scale !== undefined) from.scale = opts.scale;

    var to = {
      autoAlpha: 1, y: 0, x: 0,
      // Kept deliberately short. A long delay plus a long duration
      // is what reads as "the content isn't there yet".
      duration: isMobile ? 0.36 : (opts.duration || 0.5),
      delay: isMobile ? 0 : (opts.delay || 0),
      ease: opts.ease || EASE,
      clearProps: 'transform,visibility'
    };
    if (opts.scale !== undefined) to.scale = 1;

    var rect = el.getBoundingClientRect();
    var onScreenNow = rect.top < VH * 0.94 && rect.bottom > 0;

    if (onScreenNow) {
      // Visible at load: animate in place, never pre-hidden
      gsap.fromTo(el, from, to);
      return;
    }

    /* Inside a pinned section an element's own position stops scrolling
       once the pin engages, so an element-level trigger can never fire
       and the content would stay hidden. Trigger off the section
       instead, before it pins. */
    var pinned = !isMobile && el.closest('[data-pin], .hero-section');

    gsap.set(el, from);            // off screen, so safe to stage
    ScrollTrigger.create({
      trigger: pinned || el,
      start: pinned ? 'top 70%' : (isMobile ? 'top 97%' : 'top 94%'),
      once: true,
      onEnter: function () { gsap.to(el, to); }
    });
  }

  // Generic .anim reveals, lightly staggered per section
  var groups = new Map();
  els.forEach(function (el) {
    var key = el.closest('section, footer') || document.body;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(el);
  });

  /* Anything animated by the 3D block below must be skipped here, or
     two tweens fight over the same element and it flickers. */
  var HANDLED_IN_3D = '.feature-card, .step-card, .transform-card, .review-card, .stat-block, .mp-logo, .demo-form';
  function ownedBy3D(el) {
    if (isMobile) return false;
    if (el.matches(HANDLED_IN_3D)) return true;
    // headings get the line-lift treatment, except in the pinned hero
    return el.tagName === 'H2' && !el.closest('.hero-section');
  }

  groups.forEach(function (list) {
    list.forEach(function (el, i) {
      if (ownedBy3D(el)) return;

      // Cap the stagger hard — long delays are what read as laggy
      var delay = Math.min(i * 0.04, 0.16);
      var opts = { delay: delay };

      if (el.classList.contains('mp-logo')) {
        opts = { delay: Math.min(i * 0.03, 0.18), y: 16, scale: 0.88, duration: 0.42, ease: 'back.out(1.5)' };
      } else if (el.classList.contains('review-card')) {
        opts = { delay: Math.min(i * 0.04, 0.18), y: 28, duration: 0.5 };
      } else if (el.classList.contains('stat-block')) {
        opts = { delay: delay, x: 34, y: 0, duration: 0.5 };
      } else if (el.classList.contains('split-visual') || el.classList.contains('demo-form')) {
        opts = { delay: 0.04, x: 38, y: 0, duration: 0.55 };
      } else if (el.classList.contains('faq-item')) {
        opts = { delay: Math.min(i * 0.03, 0.15), y: 14, duration: 0.36 };
      } else if (el.classList.contains('hero-title')) {
        opts = { delay: 0.06, y: 36, duration: 0.7 };
      } else if (el.classList.contains('big-quote')) {
        opts = { delay: 0, y: 26, scale: 0.97, duration: 0.6 };
      }

      reveal(el, opts);
    });
  });

  // Rows inside the UI cards
  ['.sync-card .sync-row', '.order-card .order-row'].forEach(function (sel, cardIdx) {
    gsap.utils.toArray(sel).forEach(function (row, i) {
      reveal(row, {
        x: cardIdx === 0 ? 36 : -36,
        y: 0,
        duration: 0.4,
        delay: Math.min(0.06 + i * 0.05, 0.3)
      });
    });
  });

  // Chart bars grow from zero
  var chartCard = document.querySelector('.chart-card');
  if (chartCard) {
    var bars = gsap.utils.toArray('.chart-bar');
    var heights = bars.map(function (b) { return b.style.getPropertyValue('--h') || '50%'; });
    var grow = function () {
      bars.forEach(function (b, i) {
        gsap.fromTo(b, { '--h': '0%' },
          { '--h': heights[i], duration: 0.75, ease: 'power2.out', delay: i * 0.06 });
      });
    };
    if (chartCard.getBoundingClientRect().top < VH * 0.9) grow();
    else ScrollTrigger.create({ trigger: chartCard, start: 'top 82%', once: true, onEnter: grow });
  }

  // Count-up stats. Markup already holds the final value, so a
  // failure here still leaves the real numbers on screen.
  gsap.utils.toArray('[data-count]').forEach(function (el) {
    var target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    var suffix = el.dataset.suffix || '+';
    var isInt = target === Math.floor(target);
    var run = function () {
      var o = { v: 0 };
      gsap.to(o, {
        v: target, duration: 1.6, ease: 'power2.out',
        onUpdate: function () { el.textContent = (isInt ? Math.round(o.v) : o.v.toFixed(1)) + suffix; },
        onComplete: function () { el.textContent = (isInt ? target : target.toFixed(1)) + suffix; }
      });
    };
    if (el.getBoundingClientRect().top < VH * 0.9) run();
    else ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: run });
  });

  /* ============================================================
     3D COMPONENT MOTION — cards, text and the form

     Three.js draws into a canvas and cannot transform DOM nodes, so
     the real components are animated with GSAP's 3D transforms
     (perspective + rotateX/rotateY + translateZ). Same depth cue as
     the WebGL scenes, applied to actual cards, headings and fields.
     ============================================================ */
  if (!isMobile) {

    // ---- 1. Cards swing in from an angled plane -------------------
    var CARD_SETS = [
      { sel: '.feature-card',   rotY: -18, rotX: 10, z: -220 },
      { sel: '.step-card',      rotY: -16, rotX: 9,  z: -200 },
      { sel: '.transform-card', rotY: 14,  rotX: 8,  z: -160 },
      { sel: '.review-card',    rotY: -14, rotX: 8,  z: -200 },
      { sel: '.stat-block',     rotY: 18,  rotX: 6,  z: -180 },
      { sel: '.mp-logo',        rotY: 0,   rotX: 24, z: -120 }
    ];

    CARD_SETS.forEach(function (set) {
      var items = gsap.utils.toArray(set.sel);
      if (!items.length) return;
      var container = items[0].parentElement;

      items.forEach(function (el, i) {
        // Alternate the swing direction so a grid row folds inward
        var dir = i % 2 ? -1 : 1;
        gsap.set(el, { transformPerspective: 1200 });
        ScrollTrigger.create({
          trigger: container,
          start: 'top 88%',
          once: true,
          onEnter: function () {
            gsap.fromTo(el, {
              autoAlpha: 0,
              rotationY: set.rotY * dir,
              rotationX: set.rotX,
              z: set.z,
              y: 40
            }, {
              autoAlpha: 1, rotationY: 0, rotationX: 0, z: 0, y: 0,
              duration: 0.85,
              ease: 'power3.out',
              delay: Math.min(i * 0.07, 0.45),
              clearProps: 'transform,visibility'
            });
          }
        });
      });
    });

    // ---- 2. Text lifts off the page, line by line -----------------
    gsap.utils.toArray('h2, .hero-title, .feature-card h3, .step-card h3').forEach(function (h) {
      if (h.closest('.hero-section')) return;   // hero has its own pin timeline
      gsap.set(h, { transformPerspective: 900, transformOrigin: '50% 100%' });
      ScrollTrigger.create({
        trigger: h,
        start: 'top 92%',
        once: true,
        onEnter: function () {
          gsap.fromTo(h,
            { autoAlpha: 0, rotationX: -55, y: 34, z: -70 },
            { autoAlpha: 1, rotationX: 0, y: 0, z: 0, duration: 0.85,
              ease: 'power3.out', clearProps: 'transform,visibility' });
        }
      });
    });

    // ---- 3. Form fields tilt in, then the card settles ------------
    var demoCard = document.querySelector('.demo-form');
    if (demoCard) {
      var fields = gsap.utils.toArray('.demo-form .f-row, .demo-form .btn-submit');
      gsap.set(demoCard, { transformPerspective: 1400 });
      gsap.set(fields, { transformPerspective: 900 });
      ScrollTrigger.create({
        trigger: demoCard,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.timeline()
            .fromTo(demoCard,
              { autoAlpha: 0, rotationY: -16, z: -240, y: 50 },
              { autoAlpha: 1, rotationY: 0, z: 0, y: 0, duration: 0.9, ease: 'power3.out' }, 0)
            .fromTo(fields,
              { autoAlpha: 0, rotationX: -35, y: 24 },
              { autoAlpha: 1, rotationX: 0, y: 0, duration: 0.5, ease: 'power2.out',
                stagger: 0.06, clearProps: 'transform,visibility' }, 0.22);
        }
      });
    }

    // ---- 4. Pointer-driven tilt, one shared rAF loop --------------
    var tiltEls = gsap.utils.toArray('.feature-card, .step-card, .review-card, .transform-card, .stat-block, .mp-logo');
    tiltEls.forEach(function (el) {
      var qx = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power2.out' });
      var qy = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power2.out' });
      var qz = gsap.quickTo(el, 'z', { duration: 0.5, ease: 'power2.out' });

      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
        var py = (e.clientY - r.top) / r.height - 0.5;
        qx(px * 16);
        qy(-py * 14);
        qz(30);
      });
      el.addEventListener('pointerleave', function () {
        qx(0); qy(0); qz(0);
      });
    });
  }

  /* ============================================================
     STEP 3 — one refresh so every start/end is recomputed
     against the final, fully-spaced document.
     ============================================================ */
  ScrollTrigger.refresh();

  /* ============================================================
     WATCHDOG — nothing may stay invisible while on screen.
     ============================================================ */
  function sweep() {
    var vh = window.innerHeight;
    els.forEach(function (el) {
      var cs = getComputedStyle(el);
      if (parseFloat(cs.opacity) > 0.05 && cs.visibility !== 'hidden') return;
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;                // genuinely off screen
      if (el.closest('.hero-section') && (window.scrollY || 0) > vh * 0.5) return; // intended hero fade
      gsap.to(el, { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: 0.4, clearProps: 'transform,visibility' });
    });
  }

  var sweepTimer;
  window.addEventListener('scroll', function () {
    clearTimeout(sweepTimer);
    sweepTimer = setTimeout(sweep, 120);
  }, { passive: true });

  // Fonts and images settling changes section heights, which moves
  // every pin start — refresh again once everything has loaded.
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
    setTimeout(sweep, 400);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
  setTimeout(sweep, 1200);

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      VH = window.innerHeight;
      ScrollTrigger.refresh();
      sweep();
    }, 200);
  }, { passive: true });

})();
