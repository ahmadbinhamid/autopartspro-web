export const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
] as const;

// Root-relative so the CTA also works from /privacy and /terms.
export const DEMO_HREF = "/#demo";

// No self-serve signup on the dashboard, so other CTAs point at #demo instead.
export const DASHBOARD_LOGIN_URL = "https://app.autopartspro.au/login";
