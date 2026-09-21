export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Which marketplaces does AutoPartsPro actually sync with?",
    answer:
      "eBay and Google Shopping today, plus a branded storefront on your own domain. All three read and write the same inventory, so your stock count never falls out of sync. New channels ship as adapters, so your catalogue doesn't need to move when a new one lands.",
  },
  {
    question: "How does it stop overselling specifically?",
    answer:
      "Every order, whether it comes from a marketplace or your own storefront's checkout, decrements one shared stock count in real time. When a listing hits zero, it's paused everywhere else automatically, not just on the channel that sold out.",
  },
  {
    question: "Can I control what my staff can see and do?",
    answer:
      "Yes. Roles and permissions are set per organisation and can be as specific as issuing refunds or editing pricing, rather than a single blanket admin or staff toggle.",
  },
  {
    question: "Do I need a separate platform for my own storefront?",
    answer:
      "No. A branded storefront on your own domain is included and pulls from the exact same inventory as every marketplace listing, so you manage one catalogue everywhere you sell.",
  },
  {
    question: "Is there a contract, or can I cancel anytime?",
    answer:
      "Starter and Growth are billed month to month with no lock-in contract. Scale plans are set up directly with your team, with terms built for multi-location operations.",
  },
  {
    question: "How long does it take to get my catalogue live?",
    answer:
      "Most sellers import their existing eBay and Google catalogue and are syncing stock within a day. Our onboarding team handles the first channel connection with you on Growth and Scale plans.",
  },
];
