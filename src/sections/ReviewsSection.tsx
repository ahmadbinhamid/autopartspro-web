import { StarIcon } from "@/components/icons/SharedIcons";
import { REVIEWS } from "@/constants/reviews";

function Stars() {
  return (
    <div className="review-stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="section reviews-section">
      <div className="section-inner">
        <div className="reviews-head">
          <p className="q-label anim">&ldquo;What do they say about it?&rdquo;</p>
          <h2 className="anim">
            Trusted by sellers who
            <br />
            <span className="grad">left the spreadsheets behind.</span>
          </h2>
          <div className="rating-summary anim">
            <Stars />
            <p>
              <strong>4.9 out of 5</strong> — average rating from <strong>120+</strong> auto parts sellers
            </p>
          </div>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((r) => (
            <article className="review-card anim" key={r.name}>
              <span className="review-mark" aria-hidden="true">
                &ldquo;
              </span>
              <Stars />
              <p className="review-text">{r.text}</p>
              <p className="review-metric">
                <strong>{r.metricValue}</strong>
                <span>{r.metricLabel}</span>
              </p>
              <footer className="review-author">
                <div className="quote-avatar">{r.initials}</div>
                <div>
                  <div className="quote-name">{r.name}</div>
                  <div className="quote-role">{r.role}</div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
