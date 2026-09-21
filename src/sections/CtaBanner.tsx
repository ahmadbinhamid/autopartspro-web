import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CtaBanner() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div
          ref={ref}
          className="reveal relative overflow-hidden rounded-3xl border border-accent/25 bg-[hsl(220_20%_6%)] px-6 py-16 text-center sm:px-16 sm:py-20"
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(700px 420px at 15% 10%, hsl(var(--accent) / 0.32), transparent 60%), radial-gradient(600px 400px at 85% 90%, hsl(var(--accent) / 0.18), transparent 55%)",
            }}
          />
          <div
            className="grid-bg pointer-events-none absolute inset-0 opacity-30"
            aria-hidden="true"
          />

          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Stop overselling. <span className="text-accent">Start today.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-white/60">
              Connect eBay and Google Shopping in minutes. Your catalogue imports automatically, so there's nothing to rebuild by hand.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="#demo" size="lg" className="shine w-full sm:w-auto">
                Request a demo
                <ArrowRight className="h-4.5 w-4.5" />
              </ButtonLink>
              <ButtonLink
                href="#how-it-works"
                size="lg"
                className="w-full border border-white/15 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
              >
                See how it works
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
