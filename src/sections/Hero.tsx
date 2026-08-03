export function Hero() {
  return (
    <section className="section hero-section" data-pin="hero">
      <div className="section-inner section-center">
        <div className="hero-eyebrow anim">
          <span className="dot-pulse" /> Automotive Inventory Management
        </div>
        <h1 className="hero-title anim">
          Manage Every
          <br />
          Auto Part.
          <br />
          <span className="grad">Sell Everywhere.</span>
        </h1>
        <p className="hero-sub anim">One platform. Every marketplace. Zero overselling.</p>
        <div className="hero-actions anim">
          <a href="#demo-section" className="btn-cta">
            Book a Demo
          </a>
          <a href="#showcase" className="btn-ghost">
            See how it works
          </a>
        </div>
        <div className="scroll-cue anim">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
