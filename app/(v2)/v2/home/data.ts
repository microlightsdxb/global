
// Hero
export type HeroSlide = {
  title: string;
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

// About
export type AboutData = {
  title: string;
  image: string;
  stats: { key: "years" | "projects" | "clients"; suffix: string; label: string }[];
  cta: { label: string; href: string };
};

export const aboutData: AboutData = {
  title: "About Microlights",
  image: "/assets/img/v2/home/about/about.jpg",
  stats: [
    { key: "years", suffix: "+", label: "Years of Expertise" },
    { key: "projects", suffix: "'s", label: "of Projects Completed" },
    { key: "clients", suffix: "'s", label: "of Happy Clients" },
  ],
  cta: { label: "About MicroLights", href: "/about-us" },
};

// Products
export type ProductsData = {
  title: string;
  description: string;
  cta: { label: string; href: string };
};

export const productsData: ProductsData = {
  title: "Our Products",
  description:
    "From ceiling recessed trims and track systems to outdoor and industrial fixtures, Microlights offers a complete lighting range engineered for every environment and application.",
  cta: { label: "View all products", href: "/lighting-products" },
};

// Sectors
export type Sector = {
  title: string;
  icon: string;
  image: string;
  alt: string;
  href?: string;
};

export type SectorsData = {
  title: string;
  description: string;
  bgImage?: string;
  sectors: Sector[];
};

const SECTORS_DIR = "/assets/img/v2/home/sectos";

export const sectorsData: SectorsData = {
  title: "Lighting Built\nAround Your Sector",
  description:
    "Every space makes different demands on light. From creating inviting environments to enhancing functionality and performance, the right lighting approach depends on the needs of each sector.",
  bgImage: `${SECTORS_DIR}/bg.png`,
  sectors: [
    {
      title: "Retail / Fashion",
      icon: `${SECTORS_DIR}/icons/animated/retail.svg`,
      image: `${SECTORS_DIR}/right/Fashion.jpg`,
      alt: "Luxury retail store with display tables and ceiling cove lighting",
    },
    {
      title: "Hospitality",
      icon: `${SECTORS_DIR}/icons/animated/hospitality.svg`,
      image: `${SECTORS_DIR}/right/Hospitality.jpg`,
      alt: "Hospitality interior lighting",
    },
    {
      title: "Commercial",
      icon: `${SECTORS_DIR}/icons/animated/commercial.svg`,
      image: `${SECTORS_DIR}/right/Commercial.jpg`,
      alt: "Commercial interior lighting",
    },
    {
      title: "Residential",
      icon: `${SECTORS_DIR}/icons/animated/residential.svg`,
      image: `${SECTORS_DIR}/right/Residential.jpg`,
      alt: "Residential interior lighting",
    },
    {
      title: "Industrial & Warehouse",
      icon: `${SECTORS_DIR}/icons/animated/industry.svg`,
      image: `${SECTORS_DIR}/right/Industrial-&-Warehouse.jpg`,
      alt: "Industrial and warehouse lighting",
    },
    {
      title: "Healthcare",
      icon: `${SECTORS_DIR}/icons/animated/healthcare.svg`,
      image: `${SECTORS_DIR}/right/Healthcare.jpg`,
      alt: "Healthcare facility lighting",
    },
  ],
};

// Projects
export type ProjectItem = {
  title: string;
  industry: string;
  scope: string;
  image: string;
  alt: string;
  href: string;
};

export type ProjectsData = {
  title: string;
  description: string;
  projects: ProjectItem[];
  cta: { label: string; href: string };
};

export const projectsData: ProjectsData = {
  title: "Our Projects",
  description:
    "With completed projects across the Middle East, Europe and Asia our portfolio reflects a trusted regional presence spanning retail, hospitality, F&B, and commercial sectors.",
  projects: [
    {
      title: "Bateel \nRestaurant Interior",
      industry: "F&B",
      scope: "Interior Lighting",
      image: "/assets/img/v2/home/projects/1.jpg",
      alt: "Bateel restaurant interior with pendant and recessed lighting",
      href: "/projects",
    },
    {
      title: "Boots \nRetail Interior Lighting Project",
      industry: "Retail",
      scope: "Interior Lighting",
      image: "/assets/img/v2/home/projects/2.jpg",
      alt: "Boots pharmacy store with track lighting over product aisles",
      href: "/projects",
    },
    {
      title: "McDonald’s \nRestaurant Interior",
      industry: "F&B",
      scope: "Interior Lighting",
      image: "/assets/img/v2/home/projects/3.jpg",
      alt: "McDonald’s restaurant interior with timber slat ceiling and linear pendants",
      href: "/projects",
    },
  ],
  cta: { label: "View all projects", href: "/projects" },
};

// What We Do
export type ServiceItem = {
  title: string;
  description: string;
  image: string;
  alt: string;
  href?: string;
};

export type WhatWeDoData = {
  title: string;
  description: string;
  bgImage: string;
  services: ServiceItem[];
};

const WHAT_WE_DO_DIR = "/assets/img/v2/home/whatWeDo";

export const whatWeDoData: WhatWeDoData = {
  title: "What We Do",
  description:
    "Lighting design, manufacturing, supply and project management — all under one roof. From concept to completion, we bring expertise, precision and experience to every stage.",
  bgImage: `${WHAT_WE_DO_DIR}/bg.png`,
  services: [
    {
      title: "Lighting Design",
      description: "Concept-to-spec design tailored to each project.",
      image: `${WHAT_WE_DO_DIR}/items/1.jpg`,
      alt: "Lobby with sculpted ceiling light lines and wall shelving",
      href: "/services/lighting-design",
    },
    {
      title: "Lighting Manufacturing",
      description: "In-house production of custom luminaires.",
      image: `${WHAT_WE_DO_DIR}/items/2.jpg`,
      alt: "Team reviewing luminaire designs in a studio",
    },
    {
      title: "Lighting Supply",
      description: "Bulk and project-based supply, fulfilled direct.",
      image: `${WHAT_WE_DO_DIR}/items/3.jpg`,
      alt: "Restaurant dining room with a crystal chandelier and lit screens",
    },
    {
      title: "Project Management",
      description: "One point of accountability to handover.",
      image: `${WHAT_WE_DO_DIR}/items/4.jpg`,
      alt: "Two site engineers in safety gear walking through a construction site",
      href: "/services/project-management",
    },
  ],
};

// CTA banner
export type CtaBannerData = {
  title: string;
  description: string;
  bgImage: string;
  cta: { label: string; href: string };
};

export const ctaBannerData: CtaBannerData = {
  title: "Have a project in mind?",
  description:
    "Send us the drawings, the brief, or just the idea. Our team comes back within one working day with a specification and an indicative cost.",
  bgImage: "/assets/img/v2/home/cta/bg.jpg",
  cta: { label: "Talk To Us", href: "/contact-us" },
};

// Testimonials
export type Testimonial = {
  quote: string;
  body: string;
  name: string;
  role: string;
};

export type TestimonialsData = {
  title: string;
  description: string;
  testimonials: Testimonial[];
};

export const testimonialsData: TestimonialsData = {
  title: "Testimonials",
  description: "Hear how our lighting solutions have helped bring projects to life.",
  testimonials: [
    {
      quote: "Working with Microlights for over 13 years has been a pleasure.",
      body: "The team understood our vision and delivered fixtures that improved both the look and the energy efficiency of the space.",
      name: "Mark Holmans",
      role: "Project Director",
    },
    {
      quote: "Collaborating with Microlights transformed our restaurant's ambiance.",
      body: "Their team took the time to understand our vision, delivering a lighting solution that not only enhanced the aesthetic appeal but also improved energy efficiency.",
      name: "Mohammed Waheeduddin",
      role: "HO, Projects Bateel International",
    },
    {
      quote: "We have been working with Microlights for many years, and continue to do so.",
      body: "Their entire team are incredibly knowledgeable and helpful, and will always attempt to provide a satisfactory response to all your queries.",
      name: "Jeffrey Bartolome",
      role: "Senior Engineering Coordinator, McDonalds",
    },
  ],
};
