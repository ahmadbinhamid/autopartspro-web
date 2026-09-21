import { Container } from "@/components/ui/container";
import { EbayLogo, GoogleMerchantLogo } from "@/components/marketing/MarketplaceLogos";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Store } from "lucide-react";

const CHANNELS = [
  { name: "eBay", Logo: EbayLogo },
  { name: "Google Shopping", Logo: GoogleMerchantLogo },
  { name: "Your storefront", Logo: null },
];

export function LogosStrip() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="border-y border-border/60 bg-bg-2/40 py-10">
      <Container>
        <div ref={ref} className="reveal flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-14">
          <span className="text-xs font-semibold tracking-[0.18em] text-fg-muted uppercase">Sells everywhere it matters</span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {CHANNELS.map(({ name, Logo }) => (
              <div key={name} className="flex items-center gap-2.5 text-fg/70">
                {Logo ? (
                  <Logo className="h-6 w-6" />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Store className="h-3.5 w-3.5" />
                  </span>
                )}
                <span className="text-sm font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
