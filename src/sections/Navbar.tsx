import { Link, useLocation } from "react-router-dom";
import { SITE_NAME, EXTERNAL_LOGIN_URL } from "@/constants/site";
import { FEATURES_NAV_LINKS } from "@/constants/navLinks";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function Navbar() {
  const { pathname } = useLocation();
  const isFeatures = pathname === "/features";
  const { progressRef, scrolled } = useScrollProgress();

  return (
    <>
      {!isFeatures && <div className="progress-bar" ref={progressRef} />}

      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <Link to="/" className="logo">
            <img src="/assets/logo-mark.svg" alt="" className="logo-mark" />
            {SITE_NAME}
          </Link>

          {isFeatures && (
            <div className="nav-links">
              {FEATURES_NAV_LINKS.map((l) =>
                l.href === "/features" ? (
                  <Link key={l.href} to={l.href} className="is-active">
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.href} href={l.href}>
                    {l.label}
                  </a>
                ),
              )}
            </div>
          )}

          <div className="nav-cta">
            {isFeatures ? (
              <a href="/#demo-section" className="btn btn-primary">
                Book a Demo
              </a>
            ) : (
              <>
                <a href={EXTERNAL_LOGIN_URL} className="btn-login">
                  Log in
                </a>
                <a href="#demo-section" className="btn-nav">
                  Book a Demo
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
