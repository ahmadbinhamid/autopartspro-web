const CHART_HEIGHTS = ["35%", "52%", "44%", "68%", "58%", "75%", "82%", "90%"];
const CHART_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export function AnalyticsSection() {
  return (
    <section className="section">
      <div className="section-inner section-split">
        <div className="split-text">
          <p className="q-label anim">&ldquo;How do I know what is making money?&rdquo;</p>
          <h2 className="anim">
            Margin, broken down
            <br />
            <span className="grad">by channel.</span>
          </h2>
          <p className="scene-desc anim">
            Revenue and margin per channel and per category, after marketplace fees. This is usually where sellers find an entire category losing
            money on one marketplace.
          </p>
          <div className="inline-stats anim">
            <div className="inline-stat">
              <span className="inline-val">$284k</span>
              <span className="inline-label">Monthly Revenue</span>
            </div>
            <div className="inline-stat">
              <span className="inline-val">+18.2%</span>
              <span className="inline-label">Growth Rate</span>
            </div>
            <div className="inline-stat">
              <span className="inline-val">34%</span>
              <span className="inline-label">Profit Margin</span>
            </div>
          </div>
        </div>
        <div className="split-visual anim">
          <div className="chart-card">
            <div className="chart-bars">
              {CHART_HEIGHTS.map((h, i) => (
                <div className="chart-bar" style={{ "--h": h } as React.CSSProperties} key={i} />
              ))}
            </div>
            <div className="chart-labels">
              {CHART_LABELS.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
