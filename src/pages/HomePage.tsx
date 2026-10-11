import { SeoJsonLd } from "@/components/marketing/SeoJsonLd";
import { Hero } from "@/sections/Hero";
import { LogosStrip } from "@/sections/LogosStrip";
import { Features } from "@/sections/Features";
import { HowItWorks } from "@/sections/HowItWorks";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { Testimonials } from "@/sections/Testimonials";
import { RequestDemo } from "@/sections/RequestDemo";
import { Faq } from "@/sections/Faq";
import { CtaBanner } from "@/sections/CtaBanner";

export function HomePage() {
  return (
    <>
      <SeoJsonLd />
      <Hero />
      <LogosStrip />
      <Features />
      <HowItWorks />
      <ProductShowcase />
      <Testimonials />
      <RequestDemo />
      <Faq />
      <CtaBanner />
    </>
  );
}
