import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FEATURES } from "@/constants/features";

export function Features() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="features" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Everything, one dashboard"
          title="Built for the way parts actually sell"
          description="Every workflow here starts from fitment, SKUs and stock accuracy, the details a generic multi-channel tool treats as an afterthought."
        />

        <div ref={ref} className="stagger mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="lift-card group rounded-2xl border border-border bg-bg-2/40 p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                <feature.icon className="h-5.5 w-5.5" />
              </div>
              <h3 className="mt-5 text-base font-bold text-fg">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
