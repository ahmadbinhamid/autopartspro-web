import { Logo } from "@/components/marketing/Logo";
import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/constants/nav";
import { PRIVACY_PATH, TERMS_PATH } from "@/constants/legal";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      ...NAV_LINKS,
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Terms of Service", href: TERMS_PATH },
      { label: "Privacy Policy", href: PRIVACY_PATH },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              One platform. Every marketplace. Zero overselling. Built for auto parts sellers who'd
              rather sell parts than babysit three separate logins.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold text-fg">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-fg-muted transition-colors hover:text-accent">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-fg-muted">© {new Date().getFullYear()} AutoPartsPro. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-xs text-fg-muted hover:text-accent">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
