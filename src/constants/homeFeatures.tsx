import type { HomeFeatureCard } from "@/types/content";

export const HOME_FEATURE_CARDS: HomeFeatureCard[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2v6h-6" />
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M3 22v-6h6" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      </svg>
    ),
    title: "Inventory & Sync",
    lead: "One shared stock count, mirrored to every channel you sell on and corrected within seconds of a sale.",
    bullets: [
      { title: "Enter A Part Once", body: "Add a part a single time; its details are mapped to each channel’s required format automatically." },
      { title: "Cross-Platform Sync", body: "One catalogue mirrored to eBay, Amazon, Shopify, WooCommerce, Gumtree and your own site." },
      { title: "Real-Time Stock Updates", body: "A sale on any channel decrements everywhere at once, so you stop overselling." },
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: "Orders & Customers",
    lead: "Every order from every channel lands in a single queue with the buyer’s record attached.",
    bullets: [
      { title: "Order Management", body: "Auto-assign, auto-label and track every order to delivery from one screen." },
      { title: "Customer Management", body: "Contact details, order history and payment status held against each buyer." },
      { title: "Invoicing", body: "Generate and send invoices straight from the order — no re-typing elsewhere." },
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V8l9-5 9 5v13" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
    title: "Warehouse & Locations",
    lead: "Bin-level locations and movement history across one shed or several sites.",
    bullets: [
      { title: "Inventory Tracking", body: "Quantity, condition and cost per SKU with a full movement audit trail." },
      { title: "Multi-Location", body: "Bin and shelf references on every pick list, across every site." },
      { title: "Stock Alerts", body: "Low-stock and dead-stock warnings before they cost you a sale or shelf space." },
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      </svg>
    ),
    title: "Vehicle Fitment",
    lead: "The part that separates a parts platform from a generic shop platform.",
    bullets: [
      { title: "Vehicle Compatibility", body: "Year, make, model and engine fitment data attached to every listing." },
      { title: "VIN Search", body: "Buyers and staff match parts to a specific vehicle straight from its VIN." },
      { title: "OEM Cross-Reference", body: "OEM and aftermarket part-number matching to cut wrong-part returns." },
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-5 3 3 5-7" />
      </svg>
    ),
    title: "Reporting & Analytics",
    lead: "Revenue and margin broken down by channel and category, in real time.",
    bullets: [
      { title: "Live Dashboards", body: "Revenue, margin and channel performance without waiting for an overnight batch." },
      { title: "Margin By Channel", body: "Spot the category quietly losing money on one particular marketplace." },
      { title: "Inventory Forecasting", body: "See what is about to run out before it does." },
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Roles & Audit Trail",
    lead: "Bring in help without handing over the whole account.",
    bullets: [
      { title: "Role Permissions", body: "Decide who can edit pricing, issue refunds, adjust stock or export data." },
      { title: "Activity Logs", body: "A record of who changed what and when, across the whole account." },
      { title: "Traceable Stock", body: "Discrepancies become traceable rather than mysterious." },
    ],
  },
];
