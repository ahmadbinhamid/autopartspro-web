import type { ChatKnowledgeEntry } from "@/types/content";
import { FAQ_ENTRIES } from "@/constants/faq";
import { HOME_FEATURE_CARDS } from "@/constants/homeFeatures";
import { STEPS } from "@/constants/steps";

/**
 * Chat knowledge base, built from the same content constants that render
 * the FAQ and feature sections — an answer can never contradict what the
 * site says, and editing the FAQ/feature copy keeps the bot in sync.
 * (The original chat.js scraped this from the live DOM at runtime; here
 * it's built from the shared constants instead, which is the idiomatic
 * React equivalent of the same guarantee.)
 */
export function buildChatKnowledgeBase(): ChatKnowledgeEntry[] {
  const kb: ChatKnowledgeEntry[] = [];

  FAQ_ENTRIES.forEach((f) => {
    kb.push({ title: f.question, answer: f.answer.join(" "), jump: "#faq", titleBoost: f.question });
  });

  HOME_FEATURE_CARDS.forEach((f) => {
    const bulletTitles = f.bullets.map((b) => b.title);
    let body = f.lead;
    if (bulletTitles.length) body += " Includes: " + bulletTitles.join(", ") + ".";
    kb.push({ title: f.title, answer: body, jump: "#features", titleBoost: bulletTitles.join(" ") });
  });

  if (STEPS.length) {
    const steps = STEPS.map((s, i) => `${i + 1}. ${s.title} — ${s.body}`);
    kb.push({
      title: "How it works",
      answer: "Three steps: " + steps.join(" "),
      jump: "#showcase",
      keys: ["how does it work", "how it works", "how do i start", "getting started", "onboarding", "setup process", "how does it actually work"],
      titleBoost: "how it works setup steps getting started",
    });
  }

  kb.push({
    title: "Pricing",
    answer:
      "Pricing isn't published on the site — it depends on catalogue size and how many channels you sell on. The quickest way to get a number is a 30-minute walkthrough, and I can take you to the form now.",
    keys: ["price", "pricing", "cost", "how much", "quote", "plan", "fee", "subscription"],
    jump: "#demo-section",
  });

  kb.push({
    title: "Book a demo",
    answer: "Happy to help — the demo is a 30-minute walkthrough on your own catalogue, with no commitment. I'll scroll you to the form.",
    keys: ["demo", "book", "walkthrough", "trial", "call", "meeting", "sign up", "get started"],
    jump: "#demo-section",
  });

  kb.push({
    title: "Talk to a person",
    answer: "Of course. Fill in the demo form and a real onboarding specialist follows up within one business day — that's a person, not an autoresponder.",
    keys: ["human", "person", "someone", "agent", "sales", "contact", "talk", "speak", "phone", "email"],
    jump: "#demo-section",
  });

  kb.push({
    title: "How many sellers use it",
    answer:
      "Around 120 auto parts sellers run on Auto Parts Pro, syncing roughly 180,000 orders a month between them, at 99.9% platform uptime. We are deliberately growing carefully so onboarding stays hands-on.",
    keys: ["how many seller", "how many customer", "how many user", "how many business", "how big", "customer base"],
    jump: "#scale-proof",
  });

  kb.push({
    title: "Integrations",
    answer: "Auto Parts Pro connects to eBay, Amazon, Shopify, WooCommerce, Gumtree, Facebook Marketplace, Meta Shops, Google Shopping, and your own website.",
    keys: ["integration", "channel", "marketplace", "connect", "platform", "ebay", "amazon", "shopify", "woocommerce", "gumtree", "facebook", "google", "meta"],
    jump: "#showcase",
  });

  return kb;
}
