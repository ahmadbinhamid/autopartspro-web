export type Stat = {
  value: string;
  label: string;
};

export const STATS: Stat[] = [
  { value: "0", label: "Overselling incidents, once synced" },
  { value: "3", label: "Channels, one shared stock count" },
  { value: "<1 day", label: "To get your catalogue live" },
  { value: "24/7", label: "Real-time inventory sync" },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    number: "01",
    title: "Connect your channels",
    description:
      "Link eBay and Google Shopping in minutes. Your existing listings import automatically, so there's nothing to rebuild by hand.",
  },
  {
    number: "02",
    title: "One catalogue, one stock count",
    description:
      "Every channel, including your own storefront, now reads and writes the same inventory. Edit a price once and it's live everywhere.",
  },
  {
    number: "03",
    title: "Sell without watching the clock",
    description:
      "Orders land in one queue, stock decrements instantly, and low-stock alerts fire before you're caught out. Zero overselling, by design.",
  },
];
