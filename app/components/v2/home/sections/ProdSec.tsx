'use client'

import Image from "next/image";
import Link from "next/link";
import ArrowButton from "@/app/components/v2/common/ArrowButton";
import { useStore } from "@/app/store/productType";
import type { ProductsData } from "@/app/(v2)/v2/home/data";

type ProductType = { _id: string; type: string; image: string; hoverImage: string };

const ProdSec = ({ content, data }: { content: ProductsData; data: { data: ProductType[] } }) => {
  const setType = useStore((state) => state.setType);
  const products = data?.data ?? [];

  if (!products.length) return null;

  return (
    <section className="section-spacing">
      <div className="container">
        {/* Heading row — title + description left, "View all" right */}
        <div className="flex flex-col gap-[30px] md:flex-row md:items-start md:justify-between">
          <div className="max-w-[560px]">
            <h2 className="section-title text-black">{content.title}</h2>
            <p className="mt-[30px] text-description text-[#555555] !mb-0">{content.description}</p>
          </div>
          <ArrowButton href={content.cta.href} label={content.cta.label} tone="dark" className="shrink-0 md:mr-[42px]" />
        </div>

        {/* Cards — divider line between columns sits in the middle of the 40px gap */}
        <div className="mt-[50px] grid grid-cols-1 gap-[40px] md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product._id}
              href="/lighting-products"
              onClick={() => setType(product.type)}
              className="group relative lg:[&:not(:nth-child(3n))]:after:absolute lg:[&:not(:nth-child(3n))]:after:top-0 lg:[&:not(:nth-child(3n))]:after:right-[-20px] lg:[&:not(:nth-child(3n))]:after:h-full lg:[&:not(:nth-child(3n))]:after:w-px lg:[&:not(:nth-child(3n))]:after:bg-black/10 lg:[&:not(:nth-child(3n))]:after:content-['']"
            >
              <figure className="relative aspect-[480/526] overflow-hidden border border-black/10 bg-white">
                <Image
                  src={product.image}
                  alt={product.type}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                />
                {product.hoverImage && (
                  <Image
                    src={product.hoverImage}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                  />
                )}
              </figure>

              <div className="mt-[40px] flex items-start justify-between gap-[20px]">
                <h3 className="text-subtitle-3 text-black !mb-0">{product.type}</h3>
                <ArrowButton as="span" tone="dark" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProdSec;
