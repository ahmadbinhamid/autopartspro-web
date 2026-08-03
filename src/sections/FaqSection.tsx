import { useState } from "react";
import { FaqItem } from "@/components/faq/FaqItem";
import { FAQ_ENTRIES } from "@/constants/faq";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section faq-section" id="faq">
      <div className="section-inner faq-inner">
        <p className="q-label anim">&ldquo;I still have questions.&rdquo;</p>
        <h2 className="anim">
          Straight answers,
          <br />
          <span className="grad">no sales spin.</span>
        </h2>
        <div className="faq-list">
          {FAQ_ENTRIES.map((entry, i) => (
            <FaqItem key={entry.question} entry={entry} open={openIndex === i} onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))} />
          ))}
        </div>
      </div>
    </section>
  );
}
