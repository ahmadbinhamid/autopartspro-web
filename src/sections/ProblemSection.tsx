const STATS = [
  { value: "3+", text: "overselling incidents per week" },
  { value: "5hrs", text: "daily manual inventory updates" },
  { value: "$2.4k", text: "lost revenue from stock mismatches" },
];

export function ProblemSection() {
  return (
    <section className="section">
      <div className="section-inner section-split">
        <div className="split-text">
          <p className="q-label anim">&ldquo;Is this actually a problem for me?&rdquo;</p>
          <h2 className="anim">
            If you sell on more than two channels,
            <br />
            <span className="grad">you are already losing stock.</span>
          </h2>
          <p className="scene-desc anim">
            Manual updates. Constant overselling. Hours wasted every day juggling disconnected systems that were never built to work together.
          </p>
        </div>
        <div className="split-stats">
          {STATS.map((s) => (
            <div className="stat-block anim" key={s.text}>
              <div className="stat-big stat-red">{s.value}</div>
              <div className="stat-text">{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
