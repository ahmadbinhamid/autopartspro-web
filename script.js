/* Progress bar + nav background.
   One rAF-throttled listener rather than two unthrottled ones, and it
   runs once immediately: without that initial call the nav keeps a
   stale background when the browser restores a scroll position on
   reload, since no scroll event has fired yet. */
(function () {
  var progressBar = document.getElementById('progressBar');
  var nav = document.getElementById('nav');
  var max = 0;

  /* scrollHeight forces layout, so measure it only when it can change
     (load / resize / ScrollTrigger refresh) and cache it. The scroll
     handler then does cheap reads and writes only — no rAF, so it stays
     correct even when the browser is not painting. */
  function measure() {
    max = document.documentElement.scrollHeight - window.innerHeight;
    update();
  }

  function update() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (progressBar) {
      var pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      progressBar.style.width = pct + '%';
    }
    if (nav) nav.classList.toggle('scrolled', y > 60);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('load', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  // Pins change the document height, so re-measure after they settle
  if (window.ScrollTrigger) window.ScrollTrigger.addEventListener('refresh', measure);
  measure();
})();

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(function(item) {
  var q = item.querySelector('.faq-q');
  var a = item.querySelector('.faq-a');
  q.addEventListener('click', function() {
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// Demo form
var demoForm = document.getElementById('demoForm');
if (demoForm) {
  var formSuccess = document.getElementById('formSuccess');
  demoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!demoForm.checkValidity()) { demoForm.reportValidity(); return; }
    demoForm.querySelectorAll('input, textarea, button[type="submit"]').forEach(function(el) { el.disabled = true; });
    formSuccess.hidden = false;
    requestAnimationFrame(function() { formSuccess.classList.add('is-visible'); });
  });
}

// Smooth scroll for anchor links.
// scrollIntoView() is not usable here: pinned sections become
// position:fixed inside a ScrollTrigger pin-spacer, so their rect no
// longer maps to a scroll offset, and the fixed nav covers whatever we
// land on. Compute the destination explicitly instead.
(function () {
  var nav = document.getElementById('nav');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var animId = 0;

  /* Scroll is tweened on requestAnimationFrame rather than handed to
     `behavior: 'smooth'`. Native smooth scrolling is silently a no-op in
     some environments (headless/automated browsers, animation-disabled
     setups), which would leave every nav link doing nothing. */
  function scrollToY(y) {
    var startY = window.pageYOffset;
    var dist = y - startY;
    if (Math.abs(dist) < 2) return;

    if (reduce) { window.scrollTo(0, y); return; }

    var dur = Math.min(1000, Math.max(320, Math.abs(dist) * 0.4));
    var id = ++animId;          // a newer call cancels this one
    var t0 = null;
    var done = false;

    function step(ts) {
      if (id !== animId) return;
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; // easeInOutCubic
      window.scrollTo(0, Math.round(startY + dist * e));
      if (p < 1) requestAnimationFrame(step);
      else done = true;
    }
    requestAnimationFrame(step);

    /* Safety net: if rAF is starved (background tab, throttled or
       animation-disabled browser) the tween above may never run. Never
       let that turn a nav link into a dead click — snap to the target. */
    setTimeout(function () {
      if (!done && id === animId) window.scrollTo(0, y);
    }, dur + 260);
  }

  // Any manual scroll input abandons the animation
  ['wheel', 'touchstart', 'keydown'].forEach(function (evt) {
    window.addEventListener(evt, function () { animId++; }, { passive: true });
  });

  function destinationFor(el) {
    // For a pinned section the pin's start IS the scroll position at
    // which that section reaches the top of the viewport.
    if (window.ScrollTrigger) {
      var all = window.ScrollTrigger.getAll();
      for (var i = 0; i < all.length; i++) {
        if (all[i].pin && all[i].trigger === el) return all[i].start;
      }
    }
    return el.getBoundingClientRect().top + window.pageYOffset;
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      // Clear the sticky nav so the target heading isn't hidden under it
      var offset = (nav ? nav.getBoundingClientRect().height : 0) + 16;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var y = Math.max(0, Math.min(max, Math.round(destinationFor(target) - offset)));
      scrollToY(y);
    });
  });
})();
