import { ArrowUpRight, Boxes, LayoutDashboard, LineChart, Receipt, Settings, ShoppingCart } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { EbayLogo, GoogleMerchantLogo } from "@/components/marketing/MarketplaceLogos";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SIDEBAR_ICONS = [LayoutDashboard, Boxes, ShoppingCart, LineChart, Receipt, Settings];
const BAR_HEIGHTS = [38, 58, 46, 72, 54, 84, 62];

// A stylized, hand-built mockup of the dashboard's own shape — not a real
// screenshot (this repo has no access to production data or a rendering
// pipeline for one) — so it echoes the actual product's layout/tokens
// without presenting fabricated numbers as real.
export function ProductShowcase() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Inside the dashboard"
          title="Every channel, one screen"
          description="Stock, orders and sync status for eBay, Google Shopping and your storefront, all at a glance instead of spread across three logins."
        />

        <div ref={ref} className="reveal relative mt-16">
          <div
            className="pointer-events-none absolute -inset-x-10 -inset-y-10 -z-10 opacity-60 blur-3xl"
            style={{ background: "radial-gradient(50% 50% at 50% 40%, hsl(var(--accent) / 0.18), transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-bg-2/60 shadow-card backdrop-blur-sm">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-border/70 bg-bg-2 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg-muted/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-ok/70" />
              <span className="ml-3 rounded-md bg-bg px-3 py-1 text-[11px] text-fg-muted">app.autopartspro.au/dashboard</span>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="hidden w-16 shrink-0 flex-col items-center gap-3 border-r border-border/70 bg-bg/60 py-5 sm:flex">
                {SIDEBAR_ICONS.map((Icon, i) => (
                  <span
                    key={i}
                    className={
                      i === 0
                        ? "flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-fg"
                        : "flex h-9 w-9 items-center justify-center rounded-xl text-fg-muted"
                    }
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                ))}
              </div>

              {/* Main panel */}
              <div className="flex-1 p-5 sm:p-7">
                {/* Stat row */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Live listings", value: "1,284" },
                    { label: "In-stock SKUs", value: "3,940" },
                    { label: "Orders today", value: "62" },
                    { label: "Overselling risk", value: "0" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-border/70 bg-bg px-3.5 py-3">
                      <div className="font-display text-lg font-bold text-fg sm:text-xl">{s.value}</div>
                      <div className="mt-0.5 text-[11px] text-fg-muted">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Chart + channel sync */}
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="rounded-xl border border-border/70 bg-bg p-4 lg:col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-fg">Orders this week</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ok">
                        <ArrowUpRight className="h-3 w-3" />
                        Trending up
                      </span>
                    </div>
                    <div className="mt-4 flex h-28 items-end gap-2">
                      {BAR_HEIGHTS.map((h, i) => (
                        <span
                          key={i}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-accent/70 to-accent"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-bg p-4">
                    <span className="text-xs font-semibold text-fg">Channel sync</span>
                    <div className="mt-3 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs text-fg/80">
                          <EbayLogo className="h-4 w-4" /> eBay
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-ok">
                          <span className="h-1.5 w-1.5 rounded-full bg-ok" /> Synced
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs text-fg/80">
                          <GoogleMerchantLogo className="h-4 w-4" /> Google Shopping
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-ok">
                          <span className="h-1.5 w-1.5 rounded-full bg-ok" /> Synced
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-fg/80">Storefront</span>
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-ok">
                          <span className="h-1.5 w-1.5 rounded-full bg-ok" /> Synced
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
