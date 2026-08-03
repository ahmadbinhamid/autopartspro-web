const PROOF_STATS = [
  { count: 120, suffix: "+", label: "Auto parts sellers" },
  { count: 180, suffix: "K+", label: "Orders synced monthly" },
  { count: 99.9, suffix: "%", label: "Platform uptime" },
];

export function ScaleProof() {
  return (
    <section className="section section-accent" id="scale-proof" data-pin="scale">
      <div className="section-inner section-center">
        <p className="q-label anim">&ldquo;Who else is actually using this?&rdquo;</p>
        <h2 className="anim" data-scale-in="true">
          Independent parts sellers,
          <br />
          <span className="grad">not enterprise fleets.</span>
        </h2>
        <div className="proof-stats">
          {PROOF_STATS.map((s) => (
            <div className="proof-stat anim" key={s.label}>
              <span className="proof-val" data-count={s.count} data-suffix={s.suffix}>
                {s.count}
                {s.suffix}
              </span>
              <span className="proof-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
