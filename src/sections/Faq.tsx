import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FAQ_ITEMS } from "@/constants/faq";

export function Faq() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="faq" className="bg-bg-2/40 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Questions sellers actually ask" />

        <div ref={ref} className="reveal mx-auto mt-14 max-w-3xl">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </Container>
    </section>
  );
}
