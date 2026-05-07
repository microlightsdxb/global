import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Sitemap - Microlights",
  description:
    "Welcome to Microlights. Click here to visit our website's sitemap! Learn more about our online plant shop in Dubai.",
};

const aboutLinks = [
  { name: "About Us", link: "/about-us" },
  { name: "Our Team", link: "/our-team" },
];

const productLinks = [
  { name: "Indoor Lighting", link: "/products/indoor-lighting" },
  { name: "Outdoor Lighting", link: "/products/outdoor-lighting" },
  { name: "Industrial Lighting", link: "/products/industrial-lighting" },
];

const serviceLinks = [
  { name: "Lighting Design", link: "/services/lighting-design" },
  { name: "Project Management", link: "/services/project-management" },
];

const singleLinks = [
  { name: "Projects", link: "/projects" },
  { name: "Sustainability", link: "/sustainability" },
  { name: "Blog", link: "/blog" },
  { name: "Contact", link: "/contact" },
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Terms & Conditions", link: "/terms-and-conditions" },
];

export default function Index() {
  return (
    <section className="bg-gray-50 pt-40 pb-20">
      <div className="container">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-black mb-14">
          Sitemap
        </h1>

        {/* Box */}
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
          <div className="grid gap-12">

            {/* LEFT */}
            <div className="space-y-8">

              {/* Home */}
              <Link href="/" className="flex items-center gap-3 text-25 text-black font-medium hover:text-primary transition">Home</Link>

              {/* About */}
              <div>
                <p className="text-25 font-semibold text-black mb-3">
                  About
                </p>
                <ul className="space-y-2">
                  {aboutLinks.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.link}
                        className="flex items-center gap-3 hover:text-primary"
                      >
                        <ChevronRight size={16} className="text-primary" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products */}
              <div>
                <p className="text-25 font-semibold text-black mb-3">
                  Products
                </p>
                <ul className="space-y-2">
                  {productLinks.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.link}
                        className="flex items-center gap-3 hover:text-primary"
                      >
                        <ChevronRight size={16} className="text-primary" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* Services */}
              <div>
                <p className="text-25 font-semibold text-black mb-3">
                  Services
                </p>
                <ul className="space-y-1">
                  {serviceLinks.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.link}
                        className="flex items-center gap-3 hover:text-primary"
                      >
                        <ChevronRight size={16} className="text-primary" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Single Links */}
              {singleLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="flex items-center gap-3 text-25 font-semibold text-black hover:text-primary transition"
                >
                  {item.name}
                </Link>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
