import { ArrowRightIcon } from "@/components/icons/SharedIcons";

export function CtaSection() {
  return (
    <section className="section section-cta" data-pin="cta">
      <div className="section-inner section-center">
        <p className="q-label anim">&ldquo;Can I see it on my own stock first?&rdquo;</p>
        <h2 className="anim" data-scale-in="true">
          Yes &mdash; that is exactly
          <br />
          <span className="grad">what the demo is.</span>
        </h2>
        <p className="scene-desc anim">Book a 30-minute walkthrough. We'll show you exactly how Auto Parts Pro runs on your own catalogue.</p>
        <a href="#demo-section" className="btn-cta anim">
          Book a Demo <ArrowRightIcon />
        </a>
      </div>
    </section>
  );
}
