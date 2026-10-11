// src/components/marketing/LegalDocument.tsx
// Shared layout for long-form legal pages: header, contents list, sections.
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { LEGAL_CONTACT_EMAIL, LEGAL_LAST_UPDATED, type LegalDocumentContent } from "@/constants/legal";
import { usePageMeta } from "@/hooks/usePageMeta";

export function LegalDocument({ content }: { content: LegalDocumentContent }) {
  usePageMeta({ title: content.title, description: content.metaDescription, path: content.path });

  return (
    <article className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <Container>
        <header className="mx-auto max-w-3xl border-b border-border pb-10 lg:mx-0">
          <Badge>Legal</Badge>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance text-fg sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 text-sm text-fg-muted">Last updated: {LEGAL_LAST_UPDATED}</p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-fg-muted">
            {content.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <nav aria-label="Contents" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Contents</h2>
            <ol className="mt-4 space-y-2.5 border-l border-border">
              {content.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-sm text-fg-muted transition-colors hover:border-accent hover:text-fg"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl space-y-12">
            {content.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
                  <span className="mr-3 text-accent">{String(index + 1).padStart(2, "0")}</span>
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-fg-muted">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items ? (
                    <ul className="list-disc space-y-2.5 pl-5 marker:text-accent">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.note ? <p className="font-medium text-fg">{section.note}</p> : null}
                </div>
              </section>
            ))}

            <div className="rounded-2xl border border-border bg-bg-2 p-6 text-sm leading-relaxed text-fg-muted">
              Questions about this page? Email{" "}
              <a href={`mailto:${LEGAL_CONTACT_EMAIL}`} className="font-semibold text-accent hover:underline">
                {LEGAL_CONTACT_EMAIL}
              </a>
              .
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
