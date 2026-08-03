import { STEPS } from "@/constants/steps";

export function HowItWorks() {
  return (
    <section className="section section-soft" id="showcase">
      <div className="section-inner">
        <div className="seg-head section-center">
          <p className="q-label anim">&ldquo;How does it actually work?&rdquo;</p>
          <h2 className="anim">
            Three steps, and you&rsquo;re
            <br />
            <span className="grad">selling everywhere.</span>
          </h2>
          <p className="scene-desc anim">No agency, no developer. Our team does the connecting with you on a call, usually inside a day.</p>
        </div>

        <ol className="steps-grid">
          {STEPS.map((s) => (
            <li className="step-card anim card3d" key={s.badge}>
              <span className="step-badge">{s.badge}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="step-meta">{s.meta}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
