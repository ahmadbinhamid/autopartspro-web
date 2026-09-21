import { FAQ_ITEMS } from "@/constants/faq";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/constants/seo";

// Structured data for Google (Organization + SoftwareApplication +
// FAQPage), built FROM the same constants the page itself renders rather
// than a hand-duplicated copy — the FAQ schema in particular has to match
// what's actually visible on the page or Google can reject/penalize the
// rich-result eligibility, so importing FAQ_ITEMS directly instead of
// retyping it is what keeps that true by construction.
//
// Deliberately no Review/AggregateRating schema: the testimonials on this
// page are illustrative, not collected reviews with a verifiable source,
// and marking them up as schema.org Review data would misrepresent them
// as real to search engines — that's the kind of structured-data misuse
// Google's guidelines explicitly warn about.
//
// Rendered as a plain <script> via React (not a static tag in index.html)
// so it can import real data instead of duplicating it — Google's crawler
// executes JS before reading structured data, so this reaches it the same
// as a static tag would.
export function SeoJsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/branding/logo-mark.png`,
      description: SITE_DESCRIPTION,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}
