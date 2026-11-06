import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import ArrowButton from "@/app/components/v2/common/ArrowButton";
import Counter from "@/app/components/v2/common/Counter";
import type { AboutData } from "@/app/(v2)/v2/home/data";
import type { Home } from "@/types/Home";

const AboutSec = ({ content, data }: { content: AboutData; data: Home }) => {
  return (
    <section>
      <div className="container">
        <div className="section-spacing border-b border-black/20 grid grid-cols-1 gap-y-[40px] lg:grid-cols-[minmax(0,780fr)_minmax(0,610fr)] lg:gap-x-(--space-130) lg:items-center">
          {/* Image */}
          <figure className="relative aspect-[780/882] overflow-hidden">
            <Image
              src={content.image}
              alt={data?.aboutImageAltTag || content.title}
              fill
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(210.63deg, rgba(153, 116, 89, 0) 36.27%, rgba(153, 116, 89, 0.5) 103.4%)",
              }}
            />
          </figure>

          {/* Content */}
          <div>
            <h2 className="section-title text-black">{content.title}</h2>

            <hr className="my-[40px] border-[#E2E8F0]" />

            {data?.aboutTitle && (
              <h3 className="text-subtitle-2 text-[#7D7D7D]">{data.aboutTitle}</h3>
            )}

            {data?.aboutDescription && (
              <div className="mt-[clamp(16px,1.302vw,25px)] flex flex-col gap-[clamp(16px,1.302vw,25px)] text-description text-[#555555] [&_p]:!mb-0">
                {parse(data.aboutDescription)}
              </div>
            )}

            {/* Stats */}
            <div className="mt-[clamp(32px,2.865vw,55px)] flex justify-between">
              {content.stats.map((stat) => (
                <div key={stat.key} className="[&:not(:first-child)]:border-l [&:not(:first-child)]:border-[#7D7D7D] [&:not(:first-child)]:pl-[40px]">
                  <p className="text-subtitle-3 text-black !mb-0">
                    <Counter value={`${data?.[stat.key] ?? 0}${stat.suffix}`} />
                  </p>
                  <p className="mt-[12px] text-description-2 text-[#4A5565] !mb-0">{stat.label}</p>
                </div>
              ))}
            </div>

            <ArrowButton
              href={content.cta.href}
              label={content.cta.label}
              tone="dark" className="mt-[50px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSec;
