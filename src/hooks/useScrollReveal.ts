import { useEffect, useRef } from "react";

// Same contract as pha-storefront's own useScrollReveal: attach the ref to
// an element carrying `.reveal` or `.stagger` (see index.css) and it gets
// `.visible` added once it's scrolled into view, then stops observing.
export function useScrollReveal<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
