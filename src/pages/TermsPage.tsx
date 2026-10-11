import { LegalDocument } from "@/components/marketing/LegalDocument";
import { TERMS_OF_SERVICE } from "@/constants/legal";

export function TermsPage() {
  return <LegalDocument content={TERMS_OF_SERVICE} />;
}
