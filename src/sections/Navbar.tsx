import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/marketing/Logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NAV_LINKS, DASHBOARD_LOGIN_URL } from "@/constants/nav";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on Escape, and stop body scroll while it's open —
  // it covers the full viewport, so background content shouldn't scroll
  // underneath it.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-bg/80 backdrop-blur-lg" : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between">
        <a href="#top" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link text-sm font-medium text-fg/70 hover:text-fg">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href={DASHBOARD_LOGIN_URL} variant="ghost" size="sm">
            Sign in
          </ButtonLink>
          <ButtonLink href="#demo" size="sm" className="shine">
            Request a demo
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-2 text-fg"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </Container>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-bg transition-opacity duration-300 lg:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <Container className="flex h-18 items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-2 text-fg"
          >
            <X className="h-5 w-5" />
          </button>
        </Container>
        <nav className="flex flex-col gap-1 px-5 pt-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3.5 text-lg font-semibold text-fg hover:bg-bg-2"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-3 px-5">
          <ButtonLink href={DASHBOARD_LOGIN_URL} variant="secondary" size="lg" className="w-full justify-center">
            Sign in
          </ButtonLink>
          <ButtonLink href="#demo" size="lg" className="w-full justify-center" onClick={() => setMobileOpen(false)}>
            Request a demo
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
