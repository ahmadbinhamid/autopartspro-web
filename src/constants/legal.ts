// src/constants/legal.ts
// Privacy Policy and Terms copy, rendered by LegalDocument.

export const LEGAL_CONTACT_EMAIL = "admin.autopartspro@gmail.com";
export const LEGAL_LAST_UPDATED = "17 October 2026";

export const PRIVACY_PATH = "/privacy";
export const TERMS_PATH = "/terms";
// Meta's Data Deletion Instructions URL points at this privacy section.
const DATA_DELETION_ANCHOR = "data-deletion";
const DATA_DELETION_URL = `autopartspro.au${PRIVACY_PATH}#${DATA_DELETION_ANCHOR}`;

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: string[];
  note?: string;
};

export type LegalDocumentContent = {
  title: string;
  metaDescription: string;
  path: string;
  intro: string[];
  sections: LegalSection[];
};

export const PRIVACY_POLICY: LegalDocumentContent = {
  title: "Privacy Policy",
  metaDescription:
    "How AutoPartsPro collects, uses, stores and protects personal information, including data received from eBay, Google and Meta.",
  path: PRIVACY_PATH,
  intro: [
    'This Privacy Policy explains how AutoPartsPro ("AutoPartsPro", "we", "us" or "our") collects, uses, discloses and protects personal information when you visit autopartspro.au, request a demo, or use the AutoPartsPro dashboard, storefront and marketplace integrations (together, the "Service").',
    "We handle personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles. By using the Service you agree to the practices described in this policy.",
  ],
  sections: [
    {
      id: "information-we-collect",
      heading: "Information we collect",
      paragraphs: ["We collect the following kinds of information:"],
      items: [
        "Contact details you give us, such as your name, business name, email address, phone number and any message you send through the demo request form or by email.",
        "Account information, such as your login email, password (stored only as a secure hash), organisation details, staff users and their roles.",
        "Business and catalogue data you upload or import, such as products, part numbers, fitment data, images, pricing and stock levels.",
        "Order and customer data processed through your storefront and connected marketplaces, such as buyer names, shipping addresses, contact details and order history.",
        "Marketplace connection data, such as account identifiers and access tokens issued by eBay, Google or Meta when you connect those channels.",
        "Payment information. Storefront and point-of-sale card payments are processed by Stripe through the seller's own Stripe account; we receive limited details such as the card brand, last four digits and payment status, and never see or store full card numbers.",
        "Technical and usage data, such as IP address, browser type, device information, pages visited and actions taken in the dashboard, collected through server logs.",
      ],
    },
    {
      id: "how-we-use-information",
      heading: "How we use information",
      items: [
        "To provide, operate and maintain the Service, including syncing inventory, pricing, listings and orders across your connected channels.",
        "To create and manage your account, authenticate users and enforce role-based permissions.",
        "To process storefront and point-of-sale payments through your Stripe account, and to invoice subscription fees.",
        "To respond to demo requests, support enquiries and other communications.",
        "To monitor, secure and improve the Service, diagnose faults and prevent fraud or abuse.",
        "To send service notices, such as security alerts, changes to these terms or downtime notifications.",
        "To comply with our legal obligations and enforce our Terms of Service.",
      ],
      note: "We do not sell personal information, and we do not use your catalogue, order or customer data for advertising.",
    },
    {
      id: "marketplace-integrations",
      heading: "Marketplace and platform integrations",
      paragraphs: [
        "When you connect a sales channel, you authorise AutoPartsPro to access that platform on your behalf. We only request the permissions needed to publish and update listings, read orders and keep stock in sync, and we use data received from each platform solely to provide those features to you.",
        "eBay: we access your eBay seller account to create and update listings, read orders and adjust quantities. Your use of eBay remains subject to eBay's own user agreement and privacy notice.",
        "Google: we access Google Merchant Center to manage product data and availability. Our use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
        "Meta (Facebook and Instagram): when you connect a Meta business account, we receive your business, catalogue and page identifiers and an access token, which we use only to create, update and remove products in your Meta commerce catalogue and to read related sync status. We do not access your personal profile, friends, messages or advertising data, and we do not share Meta platform data with third parties except as needed to provide the Service.",
        "You can disconnect Meta at any time under Settings, Integrations, Meta in the dashboard; we then revoke the access token with Meta and delete it along with the stored connection details. To disconnect eBay or Google, email us and we will delete the stored access token, or revoke access from your eBay or Google account settings.",
      ],
    },
    {
      id: "acting-for-sellers",
      heading: "Data we process on behalf of sellers",
      paragraphs: [
        "Sellers who use AutoPartsPro control the personal information of their own customers, such as buyers who place orders through a storefront or marketplace. We process that information on the seller's instructions to fulfil orders and sync channels. If you are a buyer and want to access or correct your information, please contact the seller you purchased from; we will assist them in responding.",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies",
      paragraphs: [
        "We use browser storage (such as local storage) and essential cookies to keep you signed in, remember preferences such as your theme, and protect the Service. We do not use analytics or third-party advertising cookies. If you clear or block browser storage you will be signed out, and parts of the dashboard may not work.",
      ],
    },
    {
      id: "sharing",
      heading: "How we share information",
      paragraphs: ["We share personal information only as needed to run the Service:"],
      items: [
        "With the marketplaces and platforms you choose to connect, to publish listings and sync orders.",
        "With service providers who host infrastructure, store files, send email and process payments (such as Stripe), under contracts that require them to protect the information.",
        "With professional advisers, or where required by law, court order or a government authority.",
        "As part of a merger, acquisition or sale of assets, in which case the information would remain subject to this policy.",
      ],
    },
    {
      id: "overseas-disclosure",
      heading: "Overseas disclosure",
      paragraphs: [
        "Some of our service providers and the marketplaces you connect may store or process information outside Australia, including in the United States and the European Union. Where this happens, we take reasonable steps to ensure the recipient handles the information consistently with the Australian Privacy Principles.",
      ],
    },
    {
      id: "security-retention",
      heading: "Security and retention",
      paragraphs: [
        "We protect information using encryption in transit, hashed passwords, encrypted storage of access tokens, access controls and activity logging. No system is completely secure, so we cannot guarantee absolute security, but we will notify affected users and the OAIC of any eligible data breach as required by law.",
        "We keep personal information for as long as your account is active and as needed to provide the Service, then for a limited period to meet legal, tax and accounting obligations, after which it is deleted or de-identified.",
      ],
    },
    {
      id: "your-rights",
      heading: "Access, correction and deletion",
      paragraphs: [
        "You can access and update most account information directly in the dashboard. You may also ask us to access, correct or delete the personal information we hold about you by emailing us. We will respond within 30 days and may need to verify your identity first.",
      ],
    },
    {
      id: DATA_DELETION_ANCHOR,
      heading: "Data deletion instructions",
      paragraphs: [
        "To disconnect Meta (Facebook and Instagram) and delete the data we received from it:",
      ],
      items: [
        "Sign in to the AutoPartsPro dashboard with a user who can manage integrations.",
        "Go to Settings, then Integrations, then Meta.",
        "Click Disconnect and confirm.",
      ],
      note: "We then ask Meta to revoke our access, immediately delete the stored Meta access token and connection details, and stop all syncing to Facebook and Instagram.",
    },
    {
      id: "other-deletion-requests",
      heading: "Other ways to delete your data",
      paragraphs: [
        "You can also remove AutoPartsPro from Meta directly, under Business Integrations in your Facebook settings or Integrations in Meta Business Suite. Our stored token stops working straight away; email us and we will delete the stored connection details within 30 days.",
        `To disconnect eBay or Google, or to delete your entire account, email ${LEGAL_CONTACT_EMAIL} from your account email address with the subject "Data deletion request" and say what you want deleted. We may need to verify your identity, and will confirm by email once deletion is complete, within 30 days. You can also revoke access yourself from your eBay account settings or Google account permissions.`,
        "Deleting your account removes your users, catalogue, images, orders, customer records and channel connections. Records we must keep by law, such as tax invoices, are kept only as long as the law requires, and backup copies are deleted as those backups expire.",
        "Products already published to Meta, eBay or Google belong to your account on that platform and stay there until you remove them, for example in Meta Commerce Manager.",
      ],
    },
    {
      id: "children",
      heading: "Children",
      paragraphs: [
        "The Service is designed for businesses and is not directed at people under 18. We do not knowingly collect personal information from children.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this policy from time to time. We will post the updated version on this page with a new \"Last updated\" date and, for material changes, notify account holders by email or in the dashboard.",
      ],
    },
    {
      id: "contact",
      heading: "Contact and complaints",
      paragraphs: [
        `If you have a question or complaint about how we handle personal information, email us at ${LEGAL_CONTACT_EMAIL}. We will investigate and respond within 30 days. If you are not satisfied with our response, you can contact the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au.`,
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDocumentContent = {
  title: "Terms of Service",
  metaDescription:
    "The terms that govern access to and use of the AutoPartsPro website, dashboard, storefront and marketplace integrations.",
  path: TERMS_PATH,
  intro: [
    'These Terms of Service ("Terms") govern your access to and use of autopartspro.au and the AutoPartsPro dashboard, storefront and marketplace integrations (together, the "Service"), provided by AutoPartsPro ("we", "us" or "our").',
    'By creating an account, accessing or using the Service, you agree to these Terms on behalf of yourself and the business you represent ("you"). If you do not agree, do not use the Service.',
  ],
  sections: [
    {
      id: "eligibility",
      heading: "Eligibility and accounts",
      items: [
        "You must be at least 18 years old and able to enter into a binding contract on behalf of your business.",
        "Accounts are set up by us following a demo or onboarding process. You must give accurate information and keep it up to date.",
        "You are responsible for keeping login credentials secure and for all activity under your account, including actions taken by staff users you invite.",
        "Tell us promptly at the contact address below if you suspect unauthorised access to your account.",
      ],
    },
    {
      id: "the-service",
      heading: "The Service",
      paragraphs: [
        "AutoPartsPro lets you manage a parts catalogue, inventory, pricing and orders in one place and sync them with your storefront and third-party marketplaces such as eBay, Google Shopping and, once available on your account, Meta (Facebook and Instagram). We may add, change or remove features over time, and will give reasonable notice of changes that materially reduce the Service.",
      ],
    },
    {
      id: "third-party-platforms",
      heading: "Third-party platforms",
      paragraphs: [
        "When you connect a marketplace or platform, you authorise us to access it on your behalf. Your use of each platform remains subject to that platform's own terms and policies, and you are responsible for complying with them, including listing, pricing and product category rules.",
        "We do not control third-party platforms and are not responsible for their availability, API changes, fees, account suspensions or decisions about your listings. Sync timing depends on those platforms and may occasionally be delayed.",
        `You can disconnect a platform at any time, as described in the data deletion instructions in our Privacy Policy at ${DATA_DELETION_URL}. Listings already published to a platform stay in your account there until you remove them.`,
      ],
    },
    {
      id: "your-content",
      heading: "Your content and data",
      paragraphs: [
        "You keep ownership of the product data, images, prices and other content you upload or import (\"Your Content\"). You grant us a non-exclusive, worldwide licence to host, copy, process, transmit and display Your Content only as needed to provide and support the Service.",
        "You confirm you have the rights to Your Content and that it is accurate and lawful, including part descriptions, fitment information, pricing and compliance information for the goods you sell. We handle personal information as described in our Privacy Policy, and you can ask us to delete it as described there.",
      ],
    },
    {
      id: "acceptable-use",
      heading: "Acceptable use",
      paragraphs: ["You must not, and must not allow anyone else to:"],
      items: [
        "List or sell counterfeit, stolen, recalled, unsafe or otherwise illegal goods.",
        "Upload content that infringes someone else's rights or is false, misleading or deceptive.",
        "Attempt to gain unauthorised access to the Service, other accounts or our systems, or probe, scan or test their vulnerabilities without our written permission.",
        "Interfere with or overload the Service, including through scraping, automated bulk requests or malware.",
        "Copy, resell, sublicense or reverse engineer the Service, except as allowed by law.",
        "Use the Service to send spam or breach any law, including consumer and privacy laws.",
      ],
    },
    {
      id: "fees-billing",
      heading: "Fees and billing",
      items: [
        "Subscription fees are set out in your plan or order and are invoiced in advance. Prices are in Australian dollars and include GST unless stated otherwise.",
        "Month-to-month plans renew automatically each billing period until cancelled. Custom plans follow the term agreed in writing.",
        "Fees are non-refundable except where required by law or stated otherwise in these Terms.",
        "If an invoice is unpaid by its due date, we may suspend access after giving notice until the amount is paid.",
        "Marketplace fees, payment processing fees and other third-party charges are your responsibility.",
        "We may change fees with at least 30 days' notice; changes take effect from your next billing period.",
      ],
    },
    {
      id: "availability",
      heading: "Availability and support",
      paragraphs: [
        "We aim to keep the Service available at all times but do not guarantee uninterrupted or error-free operation. Planned maintenance, outages at hosting providers or marketplaces, and events outside our reasonable control may cause downtime. Support is provided by email during Australian business hours.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      paragraphs: [
        "We and our licensors own all rights in the Service, including software, designs, trademarks and documentation. These Terms give you a limited, non-exclusive, non-transferable right to use the Service during your subscription. If you send us feedback, we may use it without obligation to you.",
      ],
    },
    {
      id: "termination",
      heading: "Suspension and termination",
      items: [
        "You may cancel at any time by emailing us; cancellation takes effect at the end of the current billing period.",
        "We may suspend or terminate your access if you materially breach these Terms, fail to pay, or use the Service in a way that risks harm to us, other users or third parties.",
        "After termination you can request an export of Your Content within 30 days, after which we delete it in line with our Privacy Policy.",
      ],
    },
    {
      id: "consumer-law",
      heading: "Australian Consumer Law",
      paragraphs: [
        "Nothing in these Terms excludes, restricts or modifies any consumer guarantee, right or remedy under the Australian Consumer Law or any other law that cannot be excluded. Where our liability for breach of such a guarantee can be limited, it is limited, at our option, to supplying the services again or paying the cost of having them supplied again.",
      ],
    },
    {
      id: "liability",
      heading: "Disclaimers and limitation of liability",
      paragraphs: [
        'Subject to the section above, the Service is provided "as is" and "as available", and we exclude all warranties not expressly stated in these Terms. You are responsible for checking that listings, prices and stock levels published through the Service are correct.',
        "To the extent permitted by law, we are not liable for any indirect or consequential loss, or for loss of profits, revenue, sales, data or goodwill, including losses caused by overselling, marketplace actions or delayed syncs. Our total liability arising out of or in connection with the Service is limited to the fees you paid us in the 12 months before the event giving rise to the claim.",
      ],
    },
    {
      id: "indemnity",
      heading: "Indemnity",
      paragraphs: [
        "You indemnify us against claims, losses and costs arising from Your Content, the goods you sell, your breach of these Terms or a third-party platform's terms, or your breach of law, except to the extent caused by our own breach or negligence.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to these Terms",
      paragraphs: [
        "We may update these Terms from time to time. We will post the new version on this page and, for material changes, notify account holders at least 30 days before they take effect. Continuing to use the Service after that date means you accept the updated Terms.",
      ],
    },
    {
      id: "general",
      heading: "General",
      items: [
        "These Terms are governed by the laws in force in Australia, and you submit to the non-exclusive jurisdiction of the Australian courts.",
        "If any part of these Terms is unenforceable, the rest continues in effect.",
        "A failure to enforce a right is not a waiver of it.",
        "You may not assign your rights under these Terms without our consent. We may assign them as part of a sale or restructure of our business.",
        "These Terms, together with any order form, and our Privacy Policy, are the entire agreement between us about the Service.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      paragraphs: [`Questions about these Terms can be sent to ${LEGAL_CONTACT_EMAIL}.`],
    },
  ],
};

