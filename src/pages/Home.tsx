import { useRef } from "react";
import { Hero } from "@/sections/Hero";
import { ProblemSection } from "@/sections/ProblemSection";
import { SolutionSection } from "@/sections/SolutionSection";
import { HowItWorks } from "@/sections/HowItWorks";
import { SyncSection } from "@/sections/SyncSection";
import { OrdersSection } from "@/sections/OrdersSection";
import { AnalyticsSection } from "@/sections/AnalyticsSection";
import { HomeFeaturesSection } from "@/sections/HomeFeaturesSection";
import { IntegrationsMarquee } from "@/sections/IntegrationsMarquee";
import { ScaleProof } from "@/sections/ScaleProof";
import { ReviewsSection } from "@/sections/ReviewsSection";
import { CtaSection } from "@/sections/CtaSection";
import { DemoSection } from "@/sections/DemoSection";
import { FaqSection } from "@/sections/FaqSection";
import { useSmoothAnchorScroll } from "@/hooks/useSmoothAnchorScroll";
import { useHomeScrollAnimations } from "@/hooks/useHomeScrollAnimations";

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  useSmoothAnchorScroll(containerRef);
  useHomeScrollAnimations();

  return (
    <div ref={containerRef}>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <SyncSection />
      <OrdersSection />
      <AnalyticsSection />
      <HomeFeaturesSection />
      <IntegrationsMarquee />
      <ScaleProof />
      <ReviewsSection />
      <CtaSection />
      <DemoSection />
      <FaqSection />
    </div>
  );
}
