// Static content for the v2 homepage. Edit here — not wired to the CMS.

export type HeroSlide = {
  title: string; // use "\n" for a manual line break
  subTitle: string;
  image: string;
  alt: string;
};

export type HeroData = {
  slides: HeroSlide[];
  cta: { label: string; href: string };
};

export const heroData: HeroData = {
  slides: [
    {
      title: "Innovate.\nIlluminate. Inspire.",
      subTitle: "Smart & Sustainable Lighting Solutions",
      image: "/assets/img/v2/home/hero/1.jpg",
      alt: "Restaurant interior lit by Microlights pendant and architectural lighting",
    },
    {
      title: "Energy-Efficient Lighting\nSolutions for Smart Spaces",
      subTitle: "Smart & Sustainable Lighting Solutions",
      image: "/assets/img/v2/home/hero/2.jpg",
      alt: "Café counter with pendant and cove lighting",
    },
    {
      title: "Lighting That Elevates\nEvery Space",
      subTitle: "Smart & Sustainable Lighting Solutions",
      image: "/assets/img/v2/home/hero/3.jpg",
      alt: "Retail store with illuminated shelving and display lighting",
    },
  ],
  cta: { label: "Talk With Us", href: "/contact-us" },
};
