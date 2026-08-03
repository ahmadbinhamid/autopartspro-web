import { HOME_FEATURE_CARDS } from "@/constants/homeFeatures";

export function HomeFeaturesSection() {
  return (
    <section className="section features-section" id="features">
      <div className="section-inner">
        <div className="features-head section-center">
          <p className="q-label anim">&ldquo;What exactly do I get?&rdquo;</p>
          <h2 className="anim">
            Everything needed to run
            <br />
            <span className="grad">a parts business.</span>
          </h2>
        </div>

        <div className="features-grid">
          {HOME_FEATURE_CARDS.map((f) => (
            <article className="feature-card anim card3d" key={f.title}>
              <span className="fc-ico" aria-hidden="true">
                {f.icon}
              </span>
              <h3>{f.title}</h3>
              <p className="fc-lead">{f.lead}</p>
              <ul className="feature-list">
                {f.bullets.map((b) => (
                  <li key={b.title}>
                    <strong>{b.title}</strong>
                    {b.body}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
