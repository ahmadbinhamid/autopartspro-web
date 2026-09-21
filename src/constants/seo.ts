// Single source of truth for the site's own identity in meta tags and
// structured data, so index.html's static <meta> tags and the JSON-LD
// SeoJsonLd component (see components/marketing/SeoJsonLd.tsx) can't drift
// from each other. index.html still hardcodes its own copies for the tags
// that must work before any JS runs (title, description, OG/Twitter) —
// this file is for the values React itself needs at runtime.
export const SITE_URL = "https://autopartspro.au";
export const SITE_NAME = "AutoPartsPro";
export const SITE_DESCRIPTION =
  "AutoPartsPro syncs inventory, pricing and orders across eBay, Google Shopping and your own storefront, so auto parts sellers can manage every channel from one dashboard and stop overselling for good.";
