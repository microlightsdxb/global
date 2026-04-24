 
  import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  /* Cache headers */
  async headers() {
    return [
      {
        source: "/:path*\\.(svg|webp|avif|gif|jpg|jpeg|png|ico|woff|woff2|ttf|otf|js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  /* Image config */
  // images: {
  //   dangerouslyAllowSVG: true,
  //   domains: ["dl.dropboxusercontent.com"],
  //   unoptimized: true,
  // },
 

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
  dangerouslyAllowSVG: true,

  // ✅ allow external images (modern way)
  remotePatterns: [
    {
      protocol: "https",
      hostname: "dl.dropboxusercontent.com",
      pathname: "/**",
    }, 
  ],

  // ✅ modern formats
  formats: ["image/webp", "image/avif"],

  // ✅ responsive breakpoints
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

  // ✅ cache optimization
  minimumCacheTTL: 60,
},


  /* Redirects */
  async redirects() {
    return [
      {
        source: "/contact", // The old URL path
        destination: "/contact-us", // The new URL path
        permanent: true,  
      }, 
      {
        source: "/products", // The old URL path
        destination: "/lighting-products", // The new URL path
        permanent: true,  
      }, 
      {
        source: "/project-details/mcd", // The old URL path
        destination: "/projects/mcdonalds", // The new URL path
        permanent: true,  
      }, 
      {
        source: "/project-details/boots", // The old URL path
        destination: "/projects/boots", // The new URL path
        permanent: true,  
      },  
      {
        source: "/project-details/bateel", // The old URL path
        destination: "/projects/bateel", // The new URL path
        permanent: true,  
      },  
      {
        source: "/project-details/khaadi", // The old URL path
        destination: "/projects/khaadi", // The new URL path
        permanent: true,  
      },   
      {
        source: "/project-details/american-eagle-uae", // The old URL path
        destination: "/projects/american-eagle-uae", // The new URL path
        permanent: true,  
      },   
      {
        source: "/project-details/dr-vranjes-dubai", // The old URL path
        destination: "/projects/dr-vranjes-dubai", // The new URL path
        permanent: true,  
      },   
      {
        source: "/project-details/le-clos", // The old URL path
        destination: "/projects/le-clos", // The new URL path
        permanent: true,  
      },      
      {
        source: "/project-details/next", // The old URL path
        destination: "/projects/next", // The new URL path
        permanent: true,  
      },       
      {
        source: "/project-details/p-f-changs-corniche-kuwait", // The old URL path
        destination: "/projects/p-f-changs", // The new URL path
        permanent: true,  
      },
      {
        source: "/project-details/bath-n-body-uae", // The old URL path
        destination: "/projects/bath-n-body-works", // The new URL path
        permanent: true,  
      }, 
      {
        source: "/project-details/mmi-uae", // The old URL path
        destination: "/projects/mmi-uae", // The new URL path
        permanent: true,  
      }, 
      {
        source: "/project-details/pret-a-manger", // The old URL path
        destination: "/projects/pret-a-manger", // The new URL path
        permanent: true,  
      },  
      {
        source: "/project-details/raising-canes", // The old URL path
        destination: "/projects/raising-canes", // The new URL path
        permanent: true,  
      },   
      {
        source: "/project-details/shake-shack", // The old URL path
        destination: "/projects/shake-shack", // The new URL path
        permanent: true,  
      }, 
    ];
  },
};

export default nextConfig;
