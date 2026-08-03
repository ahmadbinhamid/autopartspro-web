// Lightweight 3D mouse-tilt for cards — no WebGL needed, works everywhere
const TILT_SELECTOR = '.feature-card, .testimonial-card, .spec-card, .stat-card, .price-card, .solution-scope-item';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;

if (!reduceMotion && !isTouch) {
  document.querySelectorAll(TILT_SELECTOR).forEach((card) => {
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '800px';
    card.style.willChange = 'transform';

    let rafId = null;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (-py * 8).toFixed(2);
      const rotateY = (px * 10).toFixed(2);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.015)`;
      });
    };

    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = '';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });
}
