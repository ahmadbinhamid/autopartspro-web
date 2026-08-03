import type { SpecCard } from "@/types/content";

export const SPEC_FEATURE_CARDS: SpecCard[] = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    tag: "AI Auto-Fill",
    title: "Upload Once",
    description: "Enter a part number or scan a vehicle VIN once. Auto Parts Pro auto-populates weight, dimensions, OEM part codes and fitment.",
    category: "Inventory",
    searchTerms: "upload once ai auto-fill vin part number weight dimensions oem fitment",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    tag: "2-Way Engine",
    title: "Cross-Platform Sync",
    description: "Automatically publish and syndicate listings across eBay, Amazon, Shopify, WooCommerce and Google Shopping with 1 click.",
    category: "Multichannel",
    searchTerms: "cross platform sync 2-way engine ebay amazon shopify woocommerce google shopping listings",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    tag: "Zero Overselling",
    title: "Real-Time Stock Updates",
    description: "When a part sells on eBay, stock levels across Amazon and Shopify drop instantly to prevent overselling.",
    category: "Multichannel",
    searchTerms: "real-time stock updates zero overselling ebay amazon shopify",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16h6v-6M22 10l-8.5 8.5-5-5L2 20" />
      </svg>
    ),
    tag: "Unified Hub",
    title: "Order Management",
    description: "Centralised order hub with multi-channel picking lists, packing slips and automatic tracking updates to buyers.",
    category: "Operations",
    searchTerms: "order management unified hub picking lists packing slips tracking updates buyers",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    tag: "Auto-CRM",
    title: "Customer Management",
    description: "Consolidate buyer messages from eBay, Amazon and your own storefront into a single CRM inbox with order and invoice context.",
    category: "Operations",
    searchTerms: "customer management auto-crm messages ebay amazon storefront crm inbox invoices",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    tag: "Recycler Grade",
    title: "Inventory Tracking",
    description: "Track core deposits, grade conditions (A/B/C grade used parts), test notes and vehicle yard dismantle history.",
    category: "Inventory",
    searchTerms: "inventory tracking recycler grade core deposits grade conditions test notes dismantle history",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    tag: "Bin Mapping",
    title: "Warehouse Management",
    description: "Multi-warehouse bin location mapping. Guide yard staff directly to Row 4, Shelf B, Bin 12 with mobile handhelds.",
    category: "Operations",
    searchTerms: "warehouse management bin mapping row shelf mobile handhelds yard staff",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    ),
    tag: "ACES / PIES",
    title: "Vehicle Compatibility",
    description: "Built-in ACES & PIES fitment standard mapping. Ensure buyers only order parts guaranteed to fit their Year/Make/Model.",
    category: "AI & Intelligence",
    searchTerms: "vehicle compatibility aces pies fitment standard year make model",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    tag: "Tax & Audit",
    title: "Reporting",
    description: "Customisable PDF & Excel financial statements, tax breakdown per state/country, and marketplace channel commission metrics.",
    category: "Operations",
    searchTerms: "reporting tax audit pdf excel financial statements state country commission metrics",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    tag: "Profit Insights",
    title: "Analytics",
    description: "Deep profit margin analysis, slow-moving stock identification, sales velocity forecasting and top-performing brand stats.",
    category: "AI & Intelligence",
    searchTerms: "analytics profit insights margin slow-moving stock sales velocity forecasting top brand",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    tag: "Security",
    title: "Role Permissions",
    description: "Granular access controls for yard dismantlers, warehouse packers, customer support staff and store accountants.",
    category: "Operations",
    searchTerms: "role permissions security access controls yard dismantlers warehouse packers support staff accountants",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    tag: "Audit Trail",
    title: "Activity Logs",
    description: "Full audit history tracking every stock change, price revision, order publication and staff action with timestamps.",
    category: "Operations",
    searchTerms: "activity logs audit trail stock change price revision order publication staff action timestamps",
  },
];
