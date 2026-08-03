import { useEffect, type RefObject } from "react";

/** Lightweight mouse-tilt for cards inside `containerRef` — no WebGL, ported 1:1 from tilt-3d.js. */
export function useTilt3D(containerRef: RefObject<HTMLElement | null>, selector: string) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (reduceMotion || isTouch) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>(selector));
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      card.style.transformStyle = "preserve-3d";
      card.style.perspective = "800px";
      card.style.willChange = "transform";

      let rafId: number | null = null;

      const onMove = (e: MouseEvent) => {
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
        card.style.transform = "";
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [containerRef, selector]);
}
