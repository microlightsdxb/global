import Index from "../../../components/BlogDetails/Index";
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

// ✅ FAQ data keyed by slug — add more slugs here as needed
const FAQ_SCHEMAS: Record<string, { name: string; text: string }[]> = {
  "warehouse-and-industrial-lighting-in-dubai-how-to-reduce-energy-costs": [
    {
      name: "How can industrial lighting solutions reduce energy costs?",
      text: "Industrial lighting solutions reduce energy costs by combining advanced fixtures with optimised system design. LED lighting consumes significantly less power while delivering higher output. In addition, zoning, occupancy sensors, and daylight integration ensure lighting is used only where needed, lowering electricity and maintenance costs.",
    },
    {
      name: "Why are LED industrial lighting solutions preferred in warehouses?",
      text: "LED industrial lighting solutions are widely preferred because they are designed for continuous operation in demanding environments. They offer longer lifespans, consistent light output, and minimal maintenance compared to traditional systems. LEDs also generate less heat, which reduces cooling loads in large warehouses. Their ability to provide uniform illumination across high ceilings and wide spaces makes them ideal for improving visibility.",
    },
    {
      name: "What role does lighting project management play in industrial facilities?",
      text: "Lighting project management ensures that all stages of a lighting upgrade or installation are properly planned and executed. It involves coordinating design, procurement, installation, and testing to ensure systems meet operational requirements. Effective project management helps avoid delays and prevents cost overruns.",
    },
    {
      name: "What factors affect the industrial lighting systems?",
      text: "Performance is influenced by layout planning, fixture quality, environmental conditions, and maintenance schedules. Poorly planned layouts can result in uneven illumination, while low-quality fixtures shorten system lifespan. In UAE facilities specifically, heat, dust, and humidity are additional variables that must be addressed through appropriate industrial LED lighting UAE specifications. Regular maintenance and proper system design are essential to maintain consistent lighting output.",
    },
  ],
  "lighting-solutions-uae-architects-interior-designers": [
    {
      name: "What are lighting solutions in the UAE?  ",
      text: "Lighting solutions encompass the design, planning, and implementation of lighting systems developed to meet the architectural, functional, and regulatory requirements of a specific project or building type.",
    },
    {
      name: "Why are lighting consultants important in UAE projects?",
      text: "Lighting consultants bring specialist knowledge of design methodology, local compliance requirements, energy performance standards, and product specification that generalist teams often lack. Their involvement typically results in better outcomes at lower long-term cost. ",
    },
    {
      name: "What are the latest lighting trends in the UAE?  ",
      text: "Smart and automated systems, sustainable lighting solutions, human-centric design, and BIM integration are among the most significant trends shaping the sector in 2025 and 2026. ",
    },
    {
      name: "How do I choose a lighting design company in the UAE? ",
      text: "Evaluate UAE-specific experience, portfolio breadth, technical and creative capability, and the company's approach to collaboration with wider project teams. References from comparable projects are the most reliable basis for comparison. ",
    },
  ],
};

async function getBlogData(slug: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/blog?slug=${slug}`,
    { next: { revalidate: 60 } }
  );
  return response.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogData(slug);

  const metadataTitle = data?.data?.metaTitle || "Microlights";
  const metadataDescription = data?.data?.metaDescription || "Microlights";

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: `/blog-details/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getBlogData(slug);

  // ✅ Article schema — rendered for every blog post
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.microlights.com/blog-details/${slug}`,
    },
    headline: data?.data?.metaTitle || data?.data?.title || "Microlights",
    description: data?.data?.metaDescription || "Microlights",
    author: {
      "@type": "Organization",
      name: "Microlights",
    },
    publisher: {
      "@type": "Organization",
      name: "Microlights",
      logo: {
        "@type": "ImageObject",
        url: "https://www.microlights.com/_next/image?url=%2Fassets%2Fimg%2Flogo.svg&w=256&q=75",
      },
    },
    ...(data?.data?.datePublished && {
      datePublished: data.data.datePublished,
    }),
    ...(data?.data?.dateModified && { dateModified: data.data.dateModified }),
    ...(data?.data?.image && {
      image: { "@type": "ImageObject", url: data.data.image },
    }),
  };

  // ✅ FAQ schema — only rendered if this slug has FAQ data defined above
  const faqItems = FAQ_SCHEMAS[slug];
  const faqJsonLd = faqItems
    ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.name,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.text,
        },
      })),
    }
    : null;


if(!data.data) return notFound()


  return (
    <>
      {/* Article schema — always present */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* FAQ schema — only injected for slugs that have FAQ data */}
      {faqJsonLd && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Index data={data}/>
    </>
  );
}