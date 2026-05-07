import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You - Microlights",
  description: "Thank you for contacting us. We will get back to you soon.",
};

export default function ThankYou() {
  return (
    <div>
      <div className="headerpadding"></div>

      {/* Banner Section */}
      <section className="relative gd-blacktrans min-h-[60vh] flex items-center">
        <div
          className="absolute inset-0 bg-black"
          // style={{
          //   backgroundImage: `url('/assets/img/contact/contact-banner.avif')`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          //   backgroundRepeat: "no-repeat",
          // }}
        ></div>
        <div className="container relative z-1">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="text-6xl text-green-400">✓</div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
              Thank You!
            </h1>
            <p className="text-lg text-40 text-gray-300 max-w-[38ch] mx-auto">
              Your message has been received successfully. We appreciate you reaching out to us.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 border-b border-gray-200">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-black text-white p-8 md:p-12 rounded-lg">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  What Happens Next?
                </h2>
                <div className="space-y-4 text-left md:text-center">
                  <p className="text-gray-300 leading-relaxed">
                    Our team will review your message and get back to you within 24-48 hours.
                    We&apos;re excited to discuss how we can help bring your vision to life.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    In the meantime, feel free to explore our portfolio or learn more about our services.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition duration-300 group"
                >
                  View Our Products
                  <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition duration-300 group"
                >
                  Our Projects
                  <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 hover:bg-gray-200 transition duration-300 group"
                >
                  Back to Home
                  <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}