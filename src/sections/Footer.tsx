import { useLocation } from "react-router-dom";
import { SITE_NAME } from "@/constants/site";
import { HOME_FOOTER_LINKS, FEATURES_FOOTER_LINKS } from "@/constants/navLinks";

export function Footer() {
  const { pathname } = useLocation();
  const links = pathname === "/features" ? FEATURES_FOOTER_LINKS : HOME_FOOTER_LINKS;

  return (
    <footer className="footer">
      <div className="section-inner footer-inner">
        <div className="footer-brand">
          <div className="logo">
            <img src="/assets/logo-mark.svg" alt="" className="logo-mark" />
            {SITE_NAME}
          </div>
          <p>Manage every auto part. Sell everywhere.</p>
        </div>
        <div className="footer-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="footer-copy">&copy; 2026 {SITE_NAME}. All rights reserved.</div>
      </div>
    </footer>
  );
}
