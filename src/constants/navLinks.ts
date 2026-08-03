export interface FeaturesNavLink {
  label: string;
  href: string;
}

/** Nav links shown on the Features page (index.html has no nav-links list — only Features does). */
export const FEATURES_NAV_LINKS: FeaturesNavLink[] = [
  { label: "Product", href: "/#solution" },
  { label: "Features", href: "/features" },
  { label: "Integrations", href: "/#integrations" },
  { label: "Request Demo", href: "/#demo-section" },
  { label: "FAQ", href: "/#faq" },
];

/** Home page footer — same-page anchors. */
export const HOME_FOOTER_LINKS: FeaturesNavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#showcase" },
  { label: "Request Demo", href: "#demo-section" },
  { label: "FAQ", href: "#faq" },
];

/** Features page footer — links back to sections on the home page. */
export const FEATURES_FOOTER_LINKS: FeaturesNavLink[] = [
  { label: "Product", href: "/#solution" },
  { label: "Integrations", href: "/#integrations" },
  { label: "Request Demo", href: "/#demo" },
  { label: "FAQ", href: "/#faq" },
];
