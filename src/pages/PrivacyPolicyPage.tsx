import { LegalDocument } from "@/components/marketing/LegalDocument";
import { PRIVACY_POLICY } from "@/constants/legal";

export function PrivacyPolicyPage() {
  return <LegalDocument content={PRIVACY_POLICY} />;
}
