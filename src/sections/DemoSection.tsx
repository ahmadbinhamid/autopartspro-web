import { CheckCircleIcon } from "@/components/icons/SharedIcons";
import { DemoForm } from "@/components/forms/DemoForm";

const BENEFITS = [
  "Tailored to your catalogue size and marketplaces",
  "Live Q&A with a real onboarding specialist",
  "No commitment — 30 minutes, on your schedule",
];

export function DemoSection() {
  return (
    <section className="section demo-section" id="demo-section">
      <div className="section-inner">
        <div className="demo-grid">
          <div className="demo-copy">
            <div className="hero-eyebrow anim">
              <span className="dot-pulse" /> Request a Demo
            </div>
            <h2 className="anim">
              See it running on
              <br />
              <span className="grad">your own catalogue.</span>
            </h2>
            <p className="scene-desc anim">
              Book a 30-minute walkthrough with our team. We'll show you exactly how Auto Parts Pro syncs your inventory, orders and customers.
            </p>
            <ul className="demo-benefits anim">
              {BENEFITS.map((b) => (
                <li key={b}>
                  <CheckCircleIcon />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <DemoForm />
        </div>
      </div>
    </section>
  );
}
