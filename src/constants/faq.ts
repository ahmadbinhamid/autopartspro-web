import type { FaqEntry } from "@/types/content";

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: "How long does it take to get set up?",
    answer: [
      "Most sellers are fully connected within a day. Our onboarding team helps you get set up at no extra cost, maps your categories to each marketplace’s taxonomy, and stays on the call while the first sync runs.",
      "Larger catalogues — roughly 50,000 SKUs and up — usually take two to three days, mainly because marketplace APIs rate-limit how fast listings can be created.",
    ],
  },
  {
    question: "Which marketplaces do you support?",
    answer: [
      "eBay, Amazon, Facebook Marketplace, Meta Shops, Google Shopping, Shopify, Gumtree, WooCommerce, and your own website.",
      "Each channel gets its own listing template, so a title and description can be tuned per marketplace while the underlying stock number stays shared.",
    ],
  },
  {
    question: "Does it really prevent overselling?",
    answer: [
      "Yes. Stock is held centrally rather than duplicated per channel, so a sale anywhere decrements the single shared count and pushes the new quantity out to every other channel in seconds.",
      "For the genuine edge case — two buyers checking out the last unit on different marketplaces within the same instant — the first confirmed order wins and the second is flagged immediately for refund or backorder, rather than silently shipping short.",
    ],
  },
  {
    question: "How does pricing work per channel?",
    answer: [
      "Each channel can carry its own price rule — a fixed markup, a percentage, or a rule that absorbs the marketplace’s commission so your net margin lands where you want it.",
      "Rules can be set per channel, per category or per individual SKU, and margin is shown after fees so a listing that only looks profitable is easy to spot.",
    ],
  },
  {
    question: "Can it manage customers and send invoices?",
    answer: [
      "Yes. Contact details, order history and payment status are tracked automatically against each buyer, across every channel they have bought from.",
      "Invoices and credit notes are generated directly from an order, so nothing needs re-typing into a separate system.",
    ],
  },
  {
    question: "Does it handle returns and refunds?",
    answer: [
      "Yes. A return is raised against the original order, and once you accept the item back the stock is either returned to sellable inventory or moved to a damaged location — your choice per return.",
      "Refunds are recorded against the order so channel-level margin reporting stays accurate rather than overstating revenue.",
    ],
  },
  {
    question: "Is it built specifically for automotive sellers?",
    answer: [
      "Yes, and this is the main thing that separates it from general retail software. Vehicle fitment data, VIN search and OEM part number matching are built in rather than bolted on.",
      "Buyers can confirm a part fits their exact year, make, model and engine before ordering, which is the single biggest driver of wrong-part returns in parts retail.",
    ],
  },
  {
    question: "Do you support multiple warehouses or locations?",
    answer: [
      "Yes. Stock is tracked per location down to bin and shelf level, and pick lists show exactly where each item sits.",
      "Orders can be routed to the location holding the stock, or to the one closest to the buyer to reduce shipping cost and time.",
    ],
  },
  {
    question: "Can I control what my staff can see and do?",
    answer: [
      "Yes. Role permissions decide who can edit pricing, issue refunds, adjust stock or export data — so you can bring in warehouse or admin help without handing over full account access.",
      "Every change is written to an activity log showing who did what and when, which makes stock discrepancies traceable rather than mysterious.",
    ],
  },
  {
    question: "What reporting do I get?",
    answer: [
      "Revenue, margin, channel performance and inventory forecasting, all in real time rather than as an overnight batch.",
      "Margin is broken down by channel and category, which is usually where sellers discover an entire category is unprofitable on one particular marketplace.",
    ],
  },
  {
    question: "Who owns my data, and can I export it?",
    answer: [
      "Your data is yours. Your catalogue, orders and customer records remain available to you, including after you cancel — just ask and we will get them to you.",
      "Data is encrypted in transit and at rest, and backed up daily.",
    ],
  },
  {
    question: "Can I cancel anytime?",
    answer: [
      "Yes — no long-term contracts. Upgrade, downgrade or cancel at any time from your account.",
      "If you cancel, your listings stay live on the marketplaces themselves; they simply stop being synced centrally. Export your data first and nothing is lost.",
    ],
  },
  {
    question: "What does it cost?",
    answer: [
      "Pricing depends on catalogue size and how many channels you sell on, so it is quoted rather than listed. A 30-minute walkthrough is the fastest way to get an accurate number for your setup.",
      "There is no charge for onboarding.",
    ],
  },
];
