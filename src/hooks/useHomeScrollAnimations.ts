import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven motion for the Home page — pinned sections, reveal-on-scroll,
 * 3D card/text motion, count-up stats and chart bars, plus a watchdog that
 * force-reveals anything left invisible on screen. Ported 1:1 from the
 * original animations.js; see that file's header comment for the two rules
 * (visibility + pin order) this implementation still has to honour.
 *
 * Scoped with gsap.context so every tween/ScrollTrigger this creates is
 * reverted on unmount — required for React (especially StrictMode's double
 * effect invocation) even though the underlying algorithm is unchanged.
 */
export function useHomeScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.defaults({ ease: "power3.out", overwrite: "auto" });

      const isMobile = window.innerWidth < 769;
      let VH = window.innerHeight;
      const EASE = "power3.out";
      const els = Array.from(document.querySelectorAll<HTMLElement>(".anim"));

      /* STEP 1 — pins, in document order, highest priority first. */
      if (!isMobile) {
        const PINS = ["hero", "solution", "scale", "cta"] as const;
        let priority = PINS.length;

        PINS.forEach((name) => {
          const sec =
            name === "hero" ? document.querySelector<HTMLElement>(".hero-section") : document.querySelector<HTMLElement>(`[data-pin="${name}"]`);
          if (!sec) {
            priority--;
            return;
          }
          const prio = priority--;

          if (name === "hero") {
            const hTitle = sec.querySelector(".hero-title");
            const hCue = sec.querySelector(".scroll-cue");
            const hBits = [sec.querySelector(".hero-eyebrow"), sec.querySelector(".hero-sub"), sec.querySelector(".hero-actions")].filter(Boolean);

            gsap
              .timeline({
                scrollTrigger: { trigger: sec, start: "top top", end: "+=90%", pin: true, scrub: 0.7, refreshPriority: prio },
              })
              .to(hTitle, { scale: 1.1, ease: "none", duration: 0.5 }, 0)
              .to(hCue, { autoAlpha: 0, duration: 0.2 }, 0)
              .to(hBits, { y: -40, autoAlpha: 0, duration: 0.35 }, 0.25)
              .to(hTitle, { y: -70, autoAlpha: 0, duration: 0.4 }, 0.5);
            return;
          }

          const ends: Record<string, string> = { solution: "+=65%", scale: "+=70%", cta: "+=55%" };
          const h2 = sec.querySelector("h2");
          if (!h2) return;
          gsap
            .timeline({
              scrollTrigger: { trigger: sec, start: "top top", end: ends[name] || "+=60%", pin: true, scrub: 0.6, refreshPriority: prio },
            })
            .fromTo(h2, { scale: 0.82 }, { scale: 1, ease: "none", duration: 0.6 }, 0)
            .to(h2, { scale: 1.04, ease: "none", duration: 0.4 }, 0.6);
        });
      }

      /* STEP 2 — reveals, created after pins. */
      function reveal(el: Element | null, opts: { y?: number; x?: number; scale?: number; duration?: number; delay?: number; ease?: string } = {}) {
        if (!el) return;

        const from: gsap.TweenVars = { autoAlpha: 0 };
        from.y = opts.y !== undefined ? opts.y : 26;
        if (opts.x !== undefined) from.x = opts.x;
        if (opts.scale !== undefined) from.scale = opts.scale;

        const to: gsap.TweenVars = {
          autoAlpha: 1,
          y: 0,
          x: 0,
          duration: isMobile ? 0.36 : opts.duration || 0.5,
          delay: isMobile ? 0 : opts.delay || 0,
          ease: opts.ease || EASE,
          clearProps: "transform,visibility",
        };
        if (opts.scale !== undefined) to.scale = 1;

        const rect = el.getBoundingClientRect();
        const onScreenNow = rect.top < VH * 0.94 && rect.bottom > 0;

        if (onScreenNow) {
          gsap.fromTo(el, from, to);
          return;
        }

        const pinned = !isMobile && el.closest("[data-pin], .hero-section");

        gsap.set(el, from);
        ScrollTrigger.create({
          trigger: pinned || el,
          start: pinned ? "top 70%" : isMobile ? "top 97%" : "top 94%",
          once: true,
          onEnter: () => gsap.to(el, to),
        });
      }

      const groups = new Map<Element, HTMLElement[]>();
      els.forEach((el) => {
        const key = el.closest("section, footer") || document.body;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(el);
      });

      const HANDLED_IN_3D = ".feature-card, .step-card, .transform-card, .review-card, .stat-block, .mp-logo, .demo-form";
      function ownedBy3D(el: HTMLElement) {
        if (isMobile) return false;
        if (el.matches(HANDLED_IN_3D)) return true;
        return el.tagName === "H2" && !el.closest(".hero-section");
      }

      groups.forEach((list) => {
        list.forEach((el, i) => {
          if (ownedBy3D(el)) return;

          const delay = Math.min(i * 0.04, 0.16);
          let opts: Parameters<typeof reveal>[1] = { delay };

          if (el.classList.contains("mp-logo")) {
            opts = { delay: Math.min(i * 0.03, 0.18), y: 16, scale: 0.88, duration: 0.42, ease: "back.out(1.5)" };
          } else if (el.classList.contains("review-card")) {
            opts = { delay: Math.min(i * 0.04, 0.18), y: 28, duration: 0.5 };
          } else if (el.classList.contains("stat-block")) {
            opts = { delay, x: 34, y: 0, duration: 0.5 };
          } else if (el.classList.contains("split-visual") || el.classList.contains("demo-form")) {
            opts = { delay: 0.04, x: 38, y: 0, duration: 0.55 };
          } else if (el.classList.contains("faq-item")) {
            opts = { delay: Math.min(i * 0.03, 0.15), y: 14, duration: 0.36 };
          } else if (el.classList.contains("hero-title")) {
            opts = { delay: 0.06, y: 36, duration: 0.7 };
          }

          reveal(el, opts);
        });
      });

      [".sync-card .sync-row", ".order-card .order-row"].forEach((sel, cardIdx) => {
        gsap.utils.toArray<HTMLElement>(sel).forEach((row, i) => {
          reveal(row, { x: cardIdx === 0 ? 36 : -36, y: 0, duration: 0.4, delay: Math.min(0.06 + i * 0.05, 0.3) });
        });
      });

      const chartCard = document.querySelector(".chart-card");
      if (chartCard) {
        const bars = gsap.utils.toArray<HTMLElement>(".chart-bar");
        const heights = bars.map((b) => b.style.getPropertyValue("--h") || "50%");
        const grow = () => {
          bars.forEach((b, i) => {
            gsap.fromTo(b, { "--h": "0%" } as gsap.TweenVars, { "--h": heights[i], duration: 0.75, ease: "power2.out", delay: i * 0.06 } as gsap.TweenVars);
          });
        };
        if (chartCard.getBoundingClientRect().top < VH * 0.9) grow();
        else ScrollTrigger.create({ trigger: chartCard, start: "top 82%", once: true, onEnter: grow });
      }

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count || "");
        if (isNaN(target)) return;
        const suffix = el.dataset.suffix || "+";
        const isInt = target === Math.floor(target);
        const run = () => {
          const o = { v: 0 };
          gsap.to(o, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = (isInt ? Math.round(o.v) : o.v.toFixed(1)) + suffix;
            },
            onComplete: () => {
              el.textContent = (isInt ? target : target.toFixed(1)) + suffix;
            },
          });
        };
        if (el.getBoundingClientRect().top < VH * 0.9) run();
        else ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: run });
      });

      /* 3D component motion — cards, text, form. */
      if (!isMobile) {
        const CARD_SETS = [
          { sel: ".feature-card", rotY: -18, rotX: 10, z: -220 },
          { sel: ".step-card", rotY: -16, rotX: 9, z: -200 },
          { sel: ".transform-card", rotY: 14, rotX: 8, z: -160 },
          { sel: ".review-card", rotY: -14, rotX: 8, z: -200 },
          { sel: ".stat-block", rotY: 18, rotX: 6, z: -180 },
          { sel: ".mp-logo", rotY: 0, rotX: 24, z: -120 },
        ];

        CARD_SETS.forEach((set) => {
          const items = gsap.utils.toArray<HTMLElement>(set.sel);
          if (!items.length) return;
          const container = items[0].parentElement;

          items.forEach((el, i) => {
            const dir = i % 2 ? -1 : 1;
            gsap.set(el, { transformPerspective: 1200 });
            ScrollTrigger.create({
              trigger: container || el,
              start: "top 88%",
              once: true,
              onEnter: () => {
                gsap.fromTo(
                  el,
                  { autoAlpha: 0, rotationY: set.rotY * dir, rotationX: set.rotX, z: set.z, y: 40 },
                  {
                    autoAlpha: 1,
                    rotationY: 0,
                    rotationX: 0,
                    z: 0,
                    y: 0,
                    duration: 0.85,
                    ease: "power3.out",
                    delay: Math.min(i * 0.07, 0.45),
                    clearProps: "transform,visibility",
                  },
                );
              },
            });
          });
        });

        gsap.utils.toArray<HTMLElement>("h2, .hero-title, .feature-card h3, .step-card h3").forEach((h) => {
          if (h.closest(".hero-section")) return;
          gsap.set(h, { transformPerspective: 900, transformOrigin: "50% 100%" });
          ScrollTrigger.create({
            trigger: h,
            start: "top 92%",
            once: true,
            onEnter: () => {
              gsap.fromTo(
                h,
                { autoAlpha: 0, rotationX: -55, y: 34, z: -70 },
                { autoAlpha: 1, rotationX: 0, y: 0, z: 0, duration: 0.85, ease: "power3.out", clearProps: "transform,visibility" },
              );
            },
          });
        });

        const demoCard = document.querySelector(".demo-form");
        if (demoCard) {
          const fields = gsap.utils.toArray<HTMLElement>(".demo-form .f-row, .demo-form .btn-submit");
          gsap.set(demoCard, { transformPerspective: 1400 });
          gsap.set(fields, { transformPerspective: 900 });
          ScrollTrigger.create({
            trigger: demoCard,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap
                .timeline()
                .fromTo(demoCard, { autoAlpha: 0, rotationY: -16, z: -240, y: 50 }, { autoAlpha: 1, rotationY: 0, z: 0, y: 0, duration: 0.9, ease: "power3.out" }, 0)
                .fromTo(
                  fields,
                  { autoAlpha: 0, rotationX: -35, y: 24 },
                  { autoAlpha: 1, rotationX: 0, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.06, clearProps: "transform,visibility" },
                  0.22,
                );
            },
          });
        }

        const tiltEls = gsap.utils.toArray<HTMLElement>(".feature-card, .step-card, .review-card, .transform-card, .stat-block, .mp-logo");
        tiltEls.forEach((el) => {
          const qx = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power2.out" });
          const qy = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power2.out" });
          const qz = gsap.quickTo(el, "z", { duration: 0.5, ease: "power2.out" });

          el.addEventListener("pointermove", (e) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            qx(px * 16);
            qy(-py * 14);
            qz(30);
          });
          el.addEventListener("pointerleave", () => {
            qx(0);
            qy(0);
            qz(0);
          });
        });
      }

      /* STEP 3 — one refresh once the final, fully-spaced document exists. */
      ScrollTrigger.refresh();

      /* Watchdog — nothing may stay invisible while on screen. */
      function sweep() {
        const vh = window.innerHeight;
        els.forEach((el) => {
          const cs = getComputedStyle(el);
          if (parseFloat(cs.opacity) > 0.05 && cs.visibility !== "hidden") return;
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          if (el.closest(".hero-section") && (window.scrollY || 0) > vh * 0.5) return;
          gsap.to(el, { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: 0.4, clearProps: "transform,visibility" });
        });
      }

      let sweepTimer: number | undefined;
      const onScroll = () => {
        window.clearTimeout(sweepTimer);
        sweepTimer = window.setTimeout(sweep, 120);
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      const onLoad = () => {
        ScrollTrigger.refresh();
        window.setTimeout(sweep, 400);
      };
      window.addEventListener("load", onLoad);
      document.fonts?.ready?.then(() => ScrollTrigger.refresh());
      window.setTimeout(sweep, 1200);

      let rt: number | undefined;
      const onResize = () => {
        window.clearTimeout(rt);
        rt = window.setTimeout(() => {
          VH = window.innerHeight;
          ScrollTrigger.refresh();
          sweep();
        }, 200);
      };
      window.addEventListener("resize", onResize, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("load", onLoad);
        window.removeEventListener("resize", onResize);
      };
    });

    return () => ctx.revert();
  }, []);
}
