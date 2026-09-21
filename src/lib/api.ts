// Talks directly to pha-dashboard's backend — this site has no backend of
// its own. Every other AutoPartsPro frontend (the dashboard app, the
// storefront) already sends its transactional/notification email through
// that same API rather than standing up its own mail sending, so the demo
// request form follows the same pattern instead of introducing a second
// way to send an email from this product.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7001/api/v1";

export type DemoRequestPayload = {
  fullName: string;
  businessName: string;
  phone?: string;
  workEmail: string;
  message?: string;
};

export class ApiError extends Error {}

// Maps to POST /demo-request on the dashboard API (see
// server/src/routes/demoRequest.routes.js) — a marketing-site-submitted
// lead with no tenant to resolve, so it always lands in the platform's own
// inbox (ALERTS_TO) rather than a specific store's.
export async function submitDemoRequest(payload: DemoRequestPayload): Promise<void> {
  const res = await fetch(`${API_URL}/demo-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: payload.fullName,
      business_name: payload.businessName,
      phone: payload.phone || undefined,
      work_email: payload.workEmail,
      message: payload.message || undefined,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.message || "Something went wrong. Please try again.");
  }
}
