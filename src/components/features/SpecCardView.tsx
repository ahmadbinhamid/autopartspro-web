import type { SpecCard } from "@/types/content";

interface Props {
  card: SpecCard;
  index: number;
  hidden: boolean;
}

export function SpecCardView({ card, index, hidden }: Props) {
  return (
    <div
      className="spec-card"
      style={{ "--card-index": index % 9, display: hidden ? "none" : undefined } as React.CSSProperties}
      data-category={card.category}
    >
      <div className="spec-card-top">
        <div className="spec-icon">{card.icon}</div>
        <span className="spec-tag">{card.tag}</span>
      </div>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <div className="spec-footer">
        <span className="spec-category">Category: {card.category}</span>
        <a href="/#demo-section" className="spec-link">
          Read Specification <span>→</span>
        </a>
      </div>
    </div>
  );
}
