"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from 'framer-motion';
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

  const [activeTestimonialReadMore, setActiveTestimonialReadMore] = useState<string | null>(null);

  const testimonialsRef = useRef<HTMLDivElement | null>(null);
const {scrollToSection} = useStore()

  const toggleReadMore = (id: string) => {
    setActiveTestimonialReadMore(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    if (scrollToSection === "testimonials" && testimonialsRef?.current) {
    const scrollToTestimonials = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.scrollTo({
        top: testimonialsRef.current?.offsetTop ? testimonialsRef.current.offsetTop: 0,
        behavior: "smooth",
      });
    };
    scrollToTestimonials();
  }
  }, [scrollToSection]);



  return (
    <section className="section-spacing relative text-white" ref={testimonialsRef}>
      <figure className="absolute bg-primary w-full h-full inset-0 -z-10">
        <Image src={'/assets/img/banner/testimonial.jpg'} width={1900} height={900} alt="bnr" className="w-full h-full absolute object-center object-cover" />
      </figure>
      <div className="container">
        <div className="mb-[30px] lg:mb-[80px]">
          <h2 className="text-xl leading-none">Testimonials</h2>
        </div>
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
              <motion.div className="pt-[40px] relative before:absolute before:h-[1px] before:w-full before:top-0 before:bg-white itms" initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={slideVariant}
                custom={i}>
                <div className="lg:min-h-[200px]">
                  <p className="text-sm leading-relaxed text-[#B8B8B8]">
                    {testimonial.content.split(" ").length > 40 && activeTestimonialReadMore !== testimonial._id
                      ? testimonial.content.split(" ").slice(0, 40).join(" ") + "..."
                      : <motion.span initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={slideVariant} custom={i}>{testimonial.content}</motion.span>}

                    {testimonial.content.split(" ").length > 40 && (
                      <motion.span initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={slideVariant} custom={i}
                        className="text-white cursor-pointer ml-2"
                        onClick={() =>
                          toggleReadMore(testimonial._id)
                        }
                      >
                        {activeTestimonialReadMore === testimonial._id ? " Read Less" : " Read More"}
                      </motion.span>
                    )}
                  </p>
                </div>


                <div className="flex items-center gap-[15px] mt-[40px]">
                  <div className="w-[45px] h-[45px] bg-gray-500 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-[20px]">{testimonial.name}</h3>
                    <p className="text-sm text-[#B8B8B8] text-[17px]">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
