export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We oversold three times in one month before switching. Since AutoPartsPro started tracking stock across eBay and Google, that's gone completely. Zero, every month since.",
    name: "Marcus Webb",
    role: "Owner, Ironclad Auto Parts",
    initials: "MW",
  },
  {
    quote:
      "The unified order queue alone paid for itself. My warehouse team stopped needing three tabs open just to know what to pack next.",
    name: "Priya Nair",
    role: "Operations Lead, Coastal Drivetrain",
    initials: "PN",
  },
  {
    quote:
      "Reporting that actually tells you what's selling by channel, not just a number at the end of the month. We reallocated ad spend based on it in week one.",
    name: "Daniel Costa",
    role: "Founder, Southern Cross Performance",
    initials: "DC",
  },
];
