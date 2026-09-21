import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DemoRequestForm } from "@/components/marketing/DemoRequestForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const DEMO_HIGHLIGHTS = [
  "A real walkthrough on your own catalogue, not a canned script",
  "No obligation, no credit card to book the call",
  "We'll help plan the eBay/Google migration if you sign up",
];

// There's no public self-serve signup on the dashboard (see App.tsx's
// commented-out /register route) — every "Start free trial" CTA on this
// site points here rather than at the login page, since a brand-new
// prospect has no account to sign into yet. This is the actual conversion
// point for the whole page.
export function RequestDemo() {
  const copyRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="demo" className="py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div ref={copyRef} className="reveal lg:pt-4">
            <span className="mb-4 inline-block text-xs font-bold tracking-[0.2em] text-accent uppercase">
              Get started
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance text-fg sm:text-4xl lg:text-[2.75rem]">
              See it running on your own catalogue
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
              Tell us a bit about your business and we'll set up a short call to show AutoPartsPro
              working against your actual eBay, Google Shopping and storefront listings.
            </p>

            <ul className="mt-8 space-y-4">
              {DEMO_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-fg/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ok/15 text-ok">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div ref={formRef} className="reveal rounded-2xl border border-border bg-bg-2/30 p-6 shadow-card sm:p-8">
            <DemoRequestForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
