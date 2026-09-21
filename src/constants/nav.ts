export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

// Where "Sign in" goes — the dashboard app, a separate deployable this site
// doesn't own the routes for. There's no public self-serve signup on that
// app (its /register route is disabled), so every other CTA on this site
// points at #demo (sections/RequestDemo.tsx) instead of here.
export const DASHBOARD_LOGIN_URL = "https://app.autopartspro.au/login";
