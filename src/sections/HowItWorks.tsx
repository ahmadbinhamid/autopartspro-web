import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { HOW_IT_WORKS_STEPS } from "@/constants/stats";

export function HowItWorks() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="relative overflow-hidden py-24 sm:py-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_20%,transparent_70%)]" aria-hidden="true" />

      <Container className="relative">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps to one shared stock count"
          description="No migration project and no re-photographing your catalogue. Connect what you already have."
        />

        <div ref={ref} className="stagger relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* Connecting line — desktop only, sits behind the step cards. */}
          <div className="pointer-events-none absolute top-8 right-[16.5%] left-[16.5%] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" aria-hidden="true" />

          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.number} className="relative text-center md:text-left">
              <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/25 bg-bg font-display text-xl font-bold text-accent shadow-soft md:mx-0">
                {step.number}
              </div>
              <h3 className="mt-6 text-lg font-bold text-fg">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
