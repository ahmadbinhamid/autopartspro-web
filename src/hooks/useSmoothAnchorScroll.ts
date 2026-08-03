import { useEffect, type RefObject } from "react";

/**
 * Smooth-scrolls same-page `#anchor` clicks within `containerRef`, tweened
 * on requestAnimationFrame (native `behavior: "smooth"` is a silent no-op
 * in some environments). Ported 1:1 from the original script.js.
 */
export function useSmoothAnchorScroll(containerRef: RefObject<HTMLElement | null>, navSelector = "#nav") {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const nav = document.querySelector<HTMLElement>(navSelector);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animId = 0;

    function scrollToY(y: number) {
      const startY = window.pageYOffset;
      const dist = y - startY;
      if (Math.abs(dist) < 2) return;

      if (reduce) {
        window.scrollTo(0, y);
        return;
      }

      const dur = Math.min(1000, Math.max(320, Math.abs(dist) * 0.4));
      const id = ++animId;
      let t0: number | null = null;
      let done = false;

      function step(ts: number) {
        if (id !== animId) return;
        if (t0 === null) t0 = ts;
        const p = Math.min(1, (ts - t0) / dur);
        const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        window.scrollTo(0, Math.round(startY + dist * e));
        if (p < 1) requestAnimationFrame(step);
        else done = true;
      }
      requestAnimationFrame(step);

      window.setTimeout(() => {
        if (!done && id === animId) window.scrollTo(0, y);
      }, dur + 260);
    }

    const abandon = () => animId++;
    window.addEventListener("wheel", abandon, { passive: true });
    window.addEventListener("touchstart", abandon, { passive: true });
    window.addEventListener("keydown", abandon, { passive: true });

    function destinationFor(el: Element) {
      const w = window as typeof window & { ScrollTrigger?: { getAll(): Array<{ pin?: boolean; trigger: Element; start: number }> } };
      if (w.ScrollTrigger) {
        const all = w.ScrollTrigger.getAll();
        for (const st of all) {
          if (st.pin && st.trigger === el) return st.start;
        }
      }
      return el.getBoundingClientRect().top + window.pageYOffset;
    }

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const a = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || !container?.contains(a)) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const dest = document.querySelector(href);
      if (!dest) return;
      e.preventDefault();

      const offset = (nav ? nav.getBoundingClientRect().height : 0) + 16;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.max(0, Math.min(max, Math.round(destinationFor(dest) - offset)));
      scrollToY(y);
    }

    container.addEventListener("click", onClick);

    return () => {
      container.removeEventListener("click", onClick);
      window.removeEventListener("wheel", abandon);
      window.removeEventListener("touchstart", abandon);
      window.removeEventListener("keydown", abandon);
    };
  }, [containerRef, navSelector]);
}
