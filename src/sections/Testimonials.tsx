import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TESTIMONIALS } from "@/constants/testimonials";

export function Testimonials() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-bg-2/40 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Sellers on AutoPartsPro" title="Ask anyone who's stopped overselling" />

        <div ref={ref} className="stagger mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="lift-card flex h-full flex-col rounded-2xl border border-border bg-bg p-7"
            >
              <Quote className="h-7 w-7 text-accent/40" />
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-fg/85">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/70 pt-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-semibold text-fg">{t.name}</div>
                  <div className="text-xs text-fg-muted">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
