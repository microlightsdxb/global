
export const footerData = {
  description:
    "25+ years of innovative lighting solutions across the GCC, Europe and Asia. From concept to installation and beyond.",
  contacts: {
    // Figma shows "971 056 170 3002"; the live site uses +971 56 171 3002 — confirm which is right.
    phone: { label: "+971 4 328 5488", href: "tel:+97143285488" },
    mobile: { label: "+971 56 171 3002", href: "tel:+971561713002" },
    email: { label: "info@microlightsgroup.ae", href: "mailto:info@microlightsgroup.ae" },
  },
  floating: {
    phone: { label: "Call us", href: "tel:+97143285488" },
    // TODO: confirm the WhatsApp number (uses the mobile number for now)
    whatsapp: { label: "Chat on WhatsApp", href: "https://wa.me/971561713002" },
  },
  quickLinks: [
    { label: "About Microlights", href: "/about-us" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Sitemap", href: "/sitemap" },
  ],
  products: [
    { label: "Indoor Lighting", type: "Indoor", href: "/lighting-products" },
    { label: "Outdoor Lighting", type: "Outdoor", href: "/lighting-products" },
    { label: "Industrial Lighting", type: "Industrial", href: "/lighting-products" },
  ],
  socials: [
    { label: "LinkedIn", icon: "/assets/img/icons/footer/socials/linkedin.svg", href: "https://www.linkedin.com/company/microlights/" },
    { label: "Facebook", icon: "/assets/img/icons/footer/socials/fb.svg", href: "https://www.facebook.com/MicrolightsGroup" },
    { label: "X", icon: "/assets/img/icons/footer/socials/x.svg", href: "#" }, // TODO: replace "#" with the X profile URL
    { label: "Instagram", icon: "/assets/img/icons/footer/socials/insta.svg", href: "https://www.instagram.com/microlightsgroup/" },
  ],
  copyright: "© 2026 Microlights Lighting L.L.C. All rights reserved.",
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};
