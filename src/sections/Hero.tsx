import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AmazonLogo, EbayLogo, GoogleMerchantLogo, MetaLogo, ShopifyLogo } from "@/components/marketing/MarketplaceLogos";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { STATS } from "@/constants/stats";

const HERO_HIGHLIGHTS = ["No obligation to sign up", "Live in under a day", "Reply within one business day"];

export function Hero() {
  const copyRef = useScrollReveal<HTMLDivElement>(0);
  const statsRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mesh-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="grid-bg pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_30%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Floating channel chips — purely decorative, echoes the "every
          marketplace" promise without needing a real dashboard screenshot.
          Mirrored left/right at matching heights so the scatter reads as
          a balanced frame around the headline rather than random clutter. */}
      <div
        className="float pointer-events-none absolute top-32 left-[6%] hidden h-16 w-16 items-center justify-center rounded-2xl border border-border bg-bg/90 shadow-card backdrop-blur-sm sm:flex"
        aria-hidden="true"
      >
        <EbayLogo className="h-8 w-8" />
      </div>
      <div
        className="float-delay pointer-events-none absolute top-32 right-[6%] hidden h-16 w-16 items-center justify-center rounded-2xl border border-border bg-bg/90 shadow-card backdrop-blur-sm sm:flex"
        aria-hidden="true"
      >
        <GoogleMerchantLogo className="h-8 w-8" />
      </div>
      <div
        className="float-delay-2 pointer-events-none absolute top-72 left-[2%] hidden h-14 w-14 items-center justify-center rounded-2xl border border-border bg-bg/90 shadow-card backdrop-blur-sm lg:flex"
        aria-hidden="true"
      >
        <AmazonLogo className="h-7 w-7" />
      </div>
      <div
        className="float pointer-events-none absolute top-72 right-[2%] hidden h-14 w-14 items-center justify-center rounded-2xl border border-border bg-bg/90 shadow-card backdrop-blur-sm lg:flex"
        aria-hidden="true"
      >
        <MetaLogo className="h-7 w-7" />
      </div>
      <div
        className="float-delay pointer-events-none absolute top-[27rem] left-[10%] hidden h-12 w-12 items-center justify-center rounded-full bg-accent/15 sm:flex"
        aria-hidden="true"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-ok" />
      </div>
      <div
        className="float-delay-2 pointer-events-none absolute top-[27rem] right-[10%] hidden h-14 w-14 items-center justify-center rounded-2xl border border-border bg-bg/90 shadow-card backdrop-blur-sm lg:flex"
        aria-hidden="true"
      >
        <ShopifyLogo className="h-7 w-7" />
      </div>

      <Container className="relative">
        <div ref={copyRef} className="stagger mx-auto max-w-4xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-accent" />
            Built for auto parts sellers
          </div>

          <h1 className="font-display text-4xl leading-[1.08] font-bold tracking-tight text-balance text-fg sm:text-6xl lg:text-7xl">
            One platform.
            <br />
            Every marketplace.
            <br />
            <span className="gradient-text glow-orange">Zero overselling.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-balance text-fg-muted sm:text-xl">
            Sync inventory, pricing and orders across eBay, Google Shopping and your own storefront,
            all from one dashboard built specifically for parts sellers.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="#demo" size="lg" className="shine w-full sm:w-auto">
              Request a demo
              <ArrowRight className="h-4.5 w-4.5" />
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary" size="lg" className="w-full sm:w-auto">
              See how it works
            </ButtonLink>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {HERO_HIGHLIGHTS.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
                <Check className="h-4 w-4 text-ok" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="stagger mt-20 grid grid-cols-2 gap-6 sm:mt-24 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-bg-2/60 px-6 py-7 text-center backdrop-blur-sm">
              <div className="font-display text-3xl font-bold text-fg sm:text-4xl">{stat.value}</div>
              <div className="mt-1.5 text-sm text-fg-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
