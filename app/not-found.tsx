export const metadata = {
  title: "Page Not Found - Microlights",
  description:
    "Welcome to Microlights. Click here to visit our website's sitemap! Learn more about our online plant shop in Dubai.",
  robots: {
    index: false,
    follow: false,
  },
};
import { Home, Map, Phone } from "lucide-react";
import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <section className="h-screen bg-white flex items-center justify-center px-4 overflow-hidden relative">
      <div className="container text-center border border-gray-200 py-40">

        {/* Bars */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <div className="flex gap-2 items-end h-24">
            <div className="bar-wrap">
              <div className="bar bar-1" />
            </div>
            <div className="bar-wrap">
              <div className="bar bar-2" />
            </div>
            <div className="bar-wrap">
              <div className="bar bar-3" />
            </div>
          </div>

          <div className="text-9xl font-bold tracking-tighter fade-404">
            <span>4</span>
            <span className="text-gray-600">0</span>
            <span className="text-gray-400">4</span>
          </div>

          <div className="flex gap-2 items-end h-24">
            <div className="bar-wrap">
              <div className="bar bar-4" />
            </div>
            <div className="bar-wrap">
              <div className="bar bar-5" />
            </div>
            <div className="bar-wrap">
              <div className="bar bar-6" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="fade-up space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-red-500">Page Not Found</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you&apos;re looking for seems to have wandered off.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 fade-up delay-3">

          {/* Home */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-sm  bg-black/10 text-black px-6 py-3 leading-[1] hover:bg-transparent border-2 
            border-black/10 hover:text-black transition-all duration-300 ease-in-out" >
              <Home size={18} />
              Return Home
            </Link>
          </div>

          {/* Sitemap + Contact */}
          <div className="flex justify-center items-center gap-4">

            <Link
              href="/sitemap"
              className="flex items-center gap-2 text-12 uppercase bg-black/80 text-white px-6 py-2
                 leading-[1] hover:bg-transparent border-2 border-black hover:text-black
                 transition-all duration-300 ease-in-out"
            >
              <Map size={14} />
              Sitemap
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-2 text-12 uppercase bg-black/80 text-white px-6 py-2
                 leading-[1] hover:bg-transparent border-2 border-black hover:text-black
                 transition-all duration-300 ease-in-out"
            >
              <Phone size={14} />
              Contact
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
