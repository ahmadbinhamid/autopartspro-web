import { SeoJsonLd } from "@/components/marketing/SeoJsonLd";
import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { LogosStrip } from "@/sections/LogosStrip";
import { Features } from "@/sections/Features";
import { HowItWorks } from "@/sections/HowItWorks";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { Testimonials } from "@/sections/Testimonials";
import { Pricing } from "@/sections/Pricing";
import { RequestDemo } from "@/sections/RequestDemo";
import { Faq } from "@/sections/Faq";
import { CtaBanner } from "@/sections/CtaBanner";
import { Footer } from "@/sections/Footer";

export default function App() {
  return (
    <>
      <SeoJsonLd />
      <Navbar />
      <main>
        <Hero />
        <LogosStrip />
        <Features />
        <HowItWorks />
        <ProductShowcase />
        <Testimonials />
        <Pricing />
        <RequestDemo />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
