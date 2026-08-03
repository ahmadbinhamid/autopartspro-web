import { ChevronArrowIcon } from "@/components/icons/SharedIcons";

const TRANSFORMS = [
  { label: "Overselling incidents", before: "3+", beforeUnit: "a week", after: "Zero" },
  { label: "Manual inventory updates", before: "5 hrs", beforeUnit: "a day", after: "Automatic" },
  { label: "Revenue lost to mismatches", before: "$2.4k", beforeUnit: "a month", after: "Recovered" },
];

export function SolutionSection() {
  return (
    <section className="section section-accent" data-pin="solution">
      <div className="section-inner section-center">
        <p className="q-label anim">&ldquo;What would change for me?&rdquo;</p>
        <h2 className="anim" data-scale-in="true">
          The same three numbers,
          <br />
          <span className="grad">after switching.</span>
        </h2>
        <p className="scene-desc anim">One shared system replaces the spreadsheets, the double entry and the guesswork.</p>

        <div className="transform-grid">
          {TRANSFORMS.map((t) => (
            <div className="transform-card anim" key={t.label}>
              <p className="t-label">{t.label}</p>
              <div className="t-row">
                <span className="t-before">
                  {t.before} <small>{t.beforeUnit}</small>
                </span>
                <ChevronArrowIcon />
                <span className="t-after">{t.after}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
