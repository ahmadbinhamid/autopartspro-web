export type PricingPlan = {
  name: string;
  description: string;
  price: string;
  period: string;
  cta: string;
  highlighted?: boolean;
  features: string[];
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    description: "For a single seller finding their feet on one channel.",
    price: "$49",
    period: "/month",
    cta: "Request a demo",
    features: [
      "1 sales channel (eBay or Google Shopping)",
      "Up to 500 SKUs",
      "Unified order inbox",
      "Email support",
    ],
  },
  {
    name: "Growth",
    description: "For teams selling across every channel they can reach.",
    price: "$149",
    period: "/month",
    cta: "Request a demo",
    highlighted: true,
    features: [
      "Unlimited sales channels",
      "Unlimited SKUs",
      "Branded storefront on your domain",
      "Reports & stock-velocity analytics",
      "Roles & permissions",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    description: "For multi-location operations with real volume.",
    price: "Talk to us",
    period: "",
    cta: "Book a demo",
    features: [
      "Everything in Growth",
      "Multiple warehouses & locations",
      "Dedicated onboarding",
      "Custom integrations",
      "SLA-backed support",
    ],
  },
];
