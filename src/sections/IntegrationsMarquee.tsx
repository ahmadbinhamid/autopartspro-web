import { MARKETPLACE_LOGOS } from "@/constants/integrations";

function MarqueeRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="marquee-row" aria-hidden={hidden}>
      {MARKETPLACE_LOGOS.map((m) => (
        <li className="mp-logo" key={m.label}>
          <img src={m.src} alt={hidden ? "" : m.alt} />
          <span>{m.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function IntegrationsMarquee() {
  return (
    <section className="section section-soft integrations-section">
      <div className="section-inner section-center">
        <p className="q-label anim">&ldquo;Do you support the channels I use?&rdquo;</p>
        <h2 className="anim">
          Nine channels, including
          <br />
          <span className="grad">your own website.</span>
        </h2>
        <p className="scene-desc anim">One catalogue, pushed everywhere your buyers already are. Add a channel and your stock is live on it the same day.</p>
      </div>

      <div className="marquee" role="group" aria-label="Supported marketplaces">
        <div className="marquee-track">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </div>
    </section>
  );
}
