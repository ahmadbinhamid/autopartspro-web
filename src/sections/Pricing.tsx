import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PRICING_PLANS } from "@/constants/pricing";
import { cn } from "@/lib/cn";

export function Pricing() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="One price, every channel"
          description="No per-listing fees, no surprise overage charges when a channel does well. Pick the plan that matches your catalogue, not your order volume."
        />

        <div ref={ref} className="stagger mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-7",
                plan.highlighted
                  ? "border-accent/40 bg-bg shadow-[0_30px_60px_hsl(var(--accent)/0.14)] lg:-translate-y-3"
                  : "lift-card border-border bg-bg-2/30",
              )}
            >
              {plan.highlighted ? (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3.5 py-1 text-xs font-bold text-accent-fg">
                  Most popular
                </span>
              ) : null}

              <h3 className="font-display text-lg font-bold text-fg">{plan.name}</h3>
              <p className="mt-1.5 text-sm text-fg-muted">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-fg">{plan.price}</span>
                {plan.period ? <span className="text-sm text-fg-muted">{plan.period}</span> : null}
              </div>

              <ButtonLink
                href="#demo"
                variant={plan.highlighted ? "primary" : "secondary"}
                size="md"
                className={cn("mt-6 w-full justify-center", plan.highlighted && "shine")}
              >
                {plan.cta}
              </ButtonLink>

              <ul className="mt-7 space-y-3 border-t border-border/70 pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-fg/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
