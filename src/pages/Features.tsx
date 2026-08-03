import { useMemo, useRef, useState } from "react";
import { SearchIcon } from "@/components/icons/SharedIcons";
import { SpecCardView } from "@/components/features/SpecCardView";
import { SPEC_FEATURE_CARDS } from "@/constants/specFeatures";
import type { SpecCategory } from "@/types/content";
import { useTilt3D } from "@/hooks/useTilt3D";

const CATEGORIES: Array<SpecCategory | "all"> = ["all", "Inventory", "Multichannel", "Operations", "AI & Intelligence"];

export function Features() {
  const [activeFilter, setActiveFilter] = useState<SpecCategory | "all">("all");
  const [query, setQuery] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);
  useTilt3D(gridRef, ".spec-card");

  const visibility = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SPEC_FEATURE_CARDS.map((card) => {
      const matchesCategory = activeFilter === "all" || card.category === activeFilter;
      const matchesQuery = !q || card.searchTerms.includes(q) || `${card.title} ${card.description}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeFilter, query]);

  const visibleCount = visibility.filter(Boolean).length;

  return (
    <>
      <header className="features-hero">
        <div className="section-inner">
          <div className="eyebrow reveal">Full Feature Set</div>
          <h1 className="reveal">Everything a parts business needs, in one platform.</h1>
          <p className="section-sub reveal">From listing automation to VIN decoding, every feature is built specifically for how auto parts sellers actually operate.</p>
        </div>
      </header>

      <section className="feature-browser">
        <div className="section-inner">
          <div className="feature-toolbar reveal">
            <div className="feature-tabs" role="tablist">
              {CATEGORIES.map((c) => (
                <button key={c} className={`feature-tab${activeFilter === c ? " is-active" : ""}`} onClick={() => setActiveFilter(c)}>
                  {c === "all" ? "All" : c}
                </button>
              ))}
            </div>
            <div className="feature-search">
              <SearchIcon />
              <input
                type="text"
                id="featureSearch"
                placeholder="Search features (e.g. VIN, ACES, Barcode)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="feature-grid-full" id="featureGrid" ref={gridRef}>
            {SPEC_FEATURE_CARDS.map((card, i) => (
              <SpecCardView key={card.title} card={card} index={i} hidden={!visibility[i]} />
            ))}
          </div>

          <div className="feature-empty" id="featureEmpty" hidden={visibleCount !== 0}>
            <p>No features match your search. Try a different keyword.</p>
          </div>
        </div>
      </section>
    </>
  );
}
