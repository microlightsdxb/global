"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home } from "@/types/Home";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/app/store/productType";

const slideVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Testimonials: React.FC<{ data: Home }> = ({ data }: { data: Home }) => {
  const [activeTestimonialReadMore, setActiveTestimonialReadMore] = useState<
    string | null
  >(null);

  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const { scrollToSection } = useStore();

  const toggleReadMore = (id: string) => {
    setActiveTestimonialReadMore((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (scrollToSection === "testimonials" && testimonialsRef?.current) {
      const scrollToTestimonials = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        window.scrollTo({
          top: testimonialsRef.current?.offsetTop
            ? testimonialsRef.current.offsetTop
            : 0,
          behavior: "smooth",
        });
      };
      scrollToTestimonials();
    }
  }, [scrollToSection]);

  const swiperWrapperRef = useRef<HTMLDivElement>(null);
  const [equalHeight, setEqualHeight] = useState<number | null>(null);

  useEffect(() => {
    if (activeTestimonialReadMore) return; // don't recalculate when expanded

    const slides = swiperWrapperRef.current?.querySelectorAll(
      ".swiper-slide > div",
    );
    if (!slides) return;

    // Reset heights first to get natural heights
    slides.forEach((slide) => {
      (slide as HTMLElement).style.height = "auto";
    });

    // Find tallest
    let max = 0;
    slides.forEach((slide) => {
      const h = (slide as HTMLElement).offsetHeight;
      if (h > max) max = h;
    });

    setEqualHeight(max);

    // Apply to all
    slides.forEach((slide) => {
      (slide as HTMLElement).style.height = `${max}px`;
    });
  }, [data, activeTestimonialReadMore]);

  return (
    <section
      className="section-spacing relative text-white"
      ref={testimonialsRef}
    >
      <figure className="absolute bg-primary w-full h-full inset-0 -z-10">
        <Image
          src={"/assets/img/banner/testimonial.jpg"}
          width={1900}
          height={900}
          alt="bnr"
          className="w-full h-full absolute object-center"
        />
      </figure>
      <div className="container">
        <div className="mb-[30px] lg:mb-[80px]">
          <h2 className="text-xl leading-none">Testimonials</h2>
        </div>
        <div ref={swiperWrapperRef}>
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            loop={false}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="tsmnls"
          >
            {data?.testimonials?.map((testimonial, i) => (
              <SwiperSlide key={testimonial._id}>
                <motion.div
                  style={{
                    height:
                      activeTestimonialReadMore === testimonial._id
                        ? "auto"
                        : equalHeight
                          ? `${equalHeight}px`
                          : "auto",
                  }}
                  className="relative px-[30px] pt-18 xl:pt-[90px] 2xl:pt-[110px] pb-[40px] bg-white/9 3xl:min-h-[586px] flex flex-col"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={slideVariant}
                  custom={i}
                >
                  {/* Absolute decorative images */}
                  <div className="absolute top-0 left-0 flex gap-1">
                    <Image
                      src="/assets/img/icons/quote.svg"
                      alt="quote-1"
                      className="pointer-events-none h-[100px] xl:h-[145px] w-auto"
                      width={72}
                      height={145}
                    />
                    <Image
                      src="/assets/img/icons/quote.svg"
                      alt="quote-2"
                      width={72}
                      height={145}
                      className="pointer-events-none h-[100px] xl:h-[145px] w-auto"
                    />
                  </div>
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[#B8B8B8]">
                    {testimonial.content.split(" ").length > 0 &&
                    activeTestimonialReadMore !== testimonial._id ? (
                      testimonial.content.split(" ").slice(0, 46).join(" ") +
                      "..."
                    ) : (
                      <motion.span
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={slideVariant}
                        custom={i}
                      >
                        {testimonial.content}
                      </motion.span>
                    )}
                    {testimonial.content.split(" ").length > 46 && (
                      <motion.span
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={slideVariant}
                        custom={i}
                        className="text-white cursor-pointer ml-2"
                        onClick={() => toggleReadMore(testimonial._id)}
                      >
                        {activeTestimonialReadMore === testimonial._id
                          ? " Read Less"
                          : " Read More"}
                      </motion.span>
                    )}
                  </p>
                  {/* Divider + Author pinned to bottom */}
                  <div className="mt-auto">
                    <div className="mb-[24px] mt-4 xl:mt-10 2xl:mt-[81px] h-[1px] w-full bg-white/80" />
                    <div>
                      <p className="font-semibold text-[20px] !mb-0">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-[#B8B8B8]">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
