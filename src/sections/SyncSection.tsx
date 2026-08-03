const SYNCED_CHANNELS = ["eBay", "Amazon", "Shopify", "WooCommerce", "Gumtree"];

export function SyncSection() {
  return (
    <section className="section">
      <div className="section-inner section-split">
        <div className="split-text">
          <p className="q-label anim">&ldquo;Will it really stop me overselling?&rdquo;</p>
          <h2 className="anim">
            Yes &mdash; because there is only
            <br />
            <span className="grad">one stock count.</span>
          </h2>
          <p className="scene-desc anim">
            Stock is held centrally, not duplicated per channel. A sale anywhere decrements that one number and the new quantity is pushed to every
            other channel within seconds.
          </p>
        </div>
        <div className="split-visual anim">
          <div className="sync-card">
            {SYNCED_CHANNELS.map((c) => (
              <div className="sync-row" key={c}>
                <span className="sync-dot sync-dot-green" />
                <span>{c}</span>
                <span className="sync-status">Synced</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
