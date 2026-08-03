const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

async function initMotion() {
  if (reduceMotion) return;

  let animate, scroll, stagger;
  try {
    ({ animate, scroll, stagger } = await import('https://cdn.jsdelivr.net/npm/motion@11.11.13/dist/motion.js'));
  } catch (err) {
    document.querySelectorAll('.dashboard-card').forEach((el) => el.classList.add('css-float-fallback'));
    return;
  }

  // ─── HERO ENTRANCE ───
  const heroTargets = document.querySelectorAll(
    '.hero-copy .eyebrow, .hero-copy h1, .hero-sub, .hero-actions'
  );
  if (heroTargets.length) {
    animate(
      heroTargets,
      { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'] },
      { duration: 0.8, delay: stagger(0.1), easing: [0.16, 1, 0.3, 1] }
    );
  }

  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    animate(
      heroVisual,
      { opacity: [0, 1], transform: ['translateY(32px) scale(0.97)', 'translateY(0px) scale(1)'] },
      { duration: 0.9, delay: 0.25, easing: [0.16, 1, 0.3, 1] }
    );
  }

  // ─── DASHBOARD CARD — scroll parallax ───
  const heroEl = document.querySelector('.hero');
  const dashboardCard = document.querySelector('.dashboard-card');
  if (heroEl && dashboardCard) {
    scroll(
      animate(dashboardCard, {
        transform: ['translateY(0px) rotateX(0deg)', 'translateY(70px) rotateX(4deg)']
      }),
      { target: heroEl, offset: ['start start', 'end start'] }
    );
  }

  // ─── DASHBOARD MOCKUP — 3D perspective on scroll ───
  const dashPreview = document.querySelector('.section.dashboard-preview');
  const dashMockup = document.querySelector('.dashboard-mockup');
  if (dashPreview && dashMockup) {
    scroll(
      animate(dashMockup, {
        transform: [
          'perspective(1200px) rotateX(3deg) translateY(20px)',
          'perspective(1200px) rotateX(0deg) translateY(0px)',
        ]
      }),
      { target: dashPreview, offset: ['start end', '0.5 0.5'] }
    );
  }

  // ─── FEATURE CARDS — slight parallax stagger ───
  const whySection = document.querySelector('.section.why');
  const featureCards = document.querySelectorAll('.feature-card');
  if (whySection && featureCards.length) {
    featureCards.forEach((card, i) => {
      scroll(
        animate(card, {
          transform: [`translateY(${15 + i * 5}px)`, 'translateY(0px)']
        }),
        { target: whySection, offset: ['start end', '0.4 0.5'] }
      );
    });
  }

  // ─── TESTIMONIAL CARDS — parallax ───
  const testSection = document.querySelector('.section.testimonials');
  const testCards = document.querySelectorAll('.testimonial-card');
  if (testSection && testCards.length) {
    testCards.forEach((card, i) => {
      scroll(
        animate(card, {
          transform: [`translateY(${20 + i * 8}px)`, 'translateY(0px)']
        }),
        { target: testSection, offset: ['start end', '0.45 0.5'] }
      );
    });
  }
}

initMotion();
