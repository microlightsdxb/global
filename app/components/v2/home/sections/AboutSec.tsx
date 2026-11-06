import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import ArrowButton from "@/app/components/v2/common/ArrowButton";
import Counter from "@/app/components/v2/common/Counter";
import Reveal, { REVEAL_STAGGER } from "@/app/components/v2/common/Reveal";
import type { AboutData } from "@/app/(v2)/v2/home/data";
import type { Home } from "@/types/Home";

const AboutSec = ({ content, data }: { content: AboutData; data: Home }) => {
  return (
    <section>
      <div className="container">
        <div className="section-spacing border-b border-black/20 grid grid-cols-1 gap-y-[40px] lg:grid-cols-[minmax(0,780fr)_minmax(0,610fr)] lg:gap-x-(--space-130) lg:items-center">
          {/* Image */}
          <Reveal>
          <figure className="relative aspect-[780/882] overflow-hidden">
            <Image
              src={content.image}
              alt={data?.aboutImageAltTag || content.title}
              fill
              className="object-cover object-center pointer-events-none"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(210.63deg, rgba(153, 116, 89, 0) 36.27%, rgba(153, 116, 89, 0.5) 103.4%)",
              }}
            />
          </figure>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal>
              <h2 className="section-title text-black">{content.title}</h2>
            </Reveal>

            <Reveal delay={REVEAL_STAGGER}>
              <hr className="my-[40px] border-[#E2E8F0]" />
            </Reveal>

            {data?.aboutTitle && (
              <Reveal delay={REVEAL_STAGGER * 2}>
                <h3 className="text-subtitle-2 text-[#7D7D7D]">{data.aboutTitle}</h3>
              </Reveal>
            )}

            {data?.aboutDescription && (
              <Reveal delay={REVEAL_STAGGER * 3} className="mt-[clamp(16px,calc(25*100vw/1920),25px)] flex flex-col gap-[clamp(16px,calc(25*100vw/1920),25px)] text-description text-[#555555] [&_p]:!mb-0">
                {parse(data.aboutDescription)}
              </Reveal>
            )}

            {/* Stats */}
            <div className="mt-[clamp(32px,calc(55*100vw/1920),55px)] flex justify-between">
              {content.stats.map((stat, index) => (
                <Reveal key={stat.key} delay={index * REVEAL_STAGGER} className="[&:not(:first-child)]:border-l [&:not(:first-child)]:border-[#7D7D7D] [&:not(:first-child)]:pl-[40px]">
                  <p className="text-subtitle-3 text-black !mb-0">
                    <Counter value={`${data?.[stat.key] ?? 0}${stat.suffix}`} />
                  </p>
                  <p className="mt-[12px] text-description-2 text-[#4A5565] !mb-0">{stat.label}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-[50px]">
              <ArrowButton href={content.cta.href} label={content.cta.label} tone="dark" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSec;
