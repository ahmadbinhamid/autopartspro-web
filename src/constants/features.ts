import {
  Boxes,
  LineChart,
  Link2,
  Receipt,
  ShieldCheck,
  ShoppingCart,
  Store,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const FEATURES: Feature[] = [
  {
    icon: Link2,
    title: "Multi-channel listings",
    description:
      "Push one catalogue to eBay, Google Shopping and your own storefront. Edit a price or a photo once and it updates everywhere it's live.",
  },
  {
    icon: Boxes,
    title: "Real-time inventory sync",
    description:
      "Stock decrements the instant an order lands, on any channel, so you never sell the same part twice from two different places.",
  },
  {
    icon: ShoppingCart,
    title: "Unified order management",
    description:
      "Every order, whether it's from a marketplace or the in-store POS, lands in one queue with the same pick, pack and refund workflow.",
  },
  {
    icon: LineChart,
    title: "Reporting that actually reports",
    description:
      "Revenue, sell-through and stock velocity broken down by channel, not just a CSV export, so you can see what's working before the quarter ends.",
  },
  {
    icon: ShieldCheck,
    title: "Roles & permissions",
    description:
      "Give warehouse staff stock access without handing them your Stripe keys. Granular, per-organisation, audit-logged.",
  },
  {
    icon: Zap,
    title: "Automated stock alerts",
    description:
      "Low-stock and overselling risk surfaced before it happens, not discovered in an angry customer email.",
  },
  {
    icon: Receipt,
    title: "Invoicing & payment links",
    description:
      "Branded invoices and Stripe-backed payment links, issued straight from the order. No bouncing between three different tools.",
  },
  {
    icon: Store,
    title: "Your own storefront, included",
    description:
      "A branded storefront on your own domain, stocked from the same inventory as every marketplace, so there's no separate platform to run.",
  },
];
