import { useEffect, useRef, useState } from "react";

/**
 * Progress bar width + nav "scrolled" background state.
 * Caches document height and re-measures only on load/resize/font-ready
 * (rather than every scroll tick) so the nav never shows a stale
 * background on reload — mirrors the original script.js behaviour.
 */
export function useScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let max = 0;

    function measure() {
      max = document.documentElement.scrollHeight - window.innerHeight;
      update();
    }

    function update() {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (progressRef.current) {
        const pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
        progressRef.current.style.width = pct + "%";
      }
      setScrolled(y > 60);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("load", measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    measure();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  return { progressRef, scrolled };
}
