const ORDERS = [
  { channel: "eBay", id: "#4821", status: "Shipped", badgeClass: "order-shipped" },
  { channel: "Amazon", id: "#4822", status: "Processing", badgeClass: "order-processing" },
  { channel: "Shopify", id: "#4823", status: "New", badgeClass: "order-new" },
  { channel: "Gumtree", id: "#4824", status: "Shipped", badgeClass: "order-shipped" },
];

export function OrdersSection() {
  return (
    <section className="section section-soft">
      <div className="section-inner section-split section-split-reverse">
        <div className="split-text">
          <p className="q-label anim">&ldquo;What happens when an order comes in?&rdquo;</p>
          <h2 className="anim">
            It lands in one queue,
            <br />
            <span className="grad">ready to pick.</span>
          </h2>
          <p className="scene-desc anim">
            Every channel feeds the same list, with the buyer record, the bin location and the shipping label attached. Nothing needs copying
            between systems.
          </p>
        </div>
        <div className="split-visual anim">
          <div className="order-card">
            {ORDERS.map((o) => (
              <div className="order-row" key={o.id}>
                <span className="order-channel">{o.channel}</span>
                <span className="order-id">{o.id}</span>
                <span className={`order-badge ${o.badgeClass}`}>{o.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
