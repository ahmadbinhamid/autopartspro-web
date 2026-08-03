import type { ReactNode } from "react";

export interface FaqEntry {
  question: string;
  answer: string[];
}

export interface HomeFeatureBullet {
  title: string;
  body: string;
}

export interface HomeFeatureCard {
  icon: ReactNode;
  title: string;
  lead: string;
  bullets: HomeFeatureBullet[];
}

export interface StepCard {
  badge: string;
  title: string;
  body: string;
  meta: string;
}

export interface MarketplaceLogo {
  src: string;
  alt: string;
  label: string;
}

export interface ReviewCard {
  text: string;
  metricValue: string;
  metricLabel: string;
  initials: string;
  name: string;
  role: string;
}

export type SpecCategory = "Inventory" | "Multichannel" | "Operations" | "AI & Intelligence";

export interface SpecCard {
  icon: ReactNode;
  tag: string;
  title: string;
  description: string;
  category: SpecCategory;
  searchTerms: string;
}

export interface ChatKnowledgeEntry {
  title: string;
  answer: string;
  jump?: string;
  titleBoost?: string;
  keys?: string[];
}
