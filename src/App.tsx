import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";
import { HomePage } from "@/pages/HomePage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsPage } from "@/pages/TermsPage";
import { PRIVACY_PATH, TERMS_PATH } from "@/constants/legal";

// No router: links are full page loads and nginx falls back to index.html.
function renderPage(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === PRIVACY_PATH) return <PrivacyPolicyPage />;
  if (path === TERMS_PATH) return <TermsPage />;
  return <HomePage />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>{renderPage(window.location.pathname)}</main>
      <Footer />
    </>
  );
}
