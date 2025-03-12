"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "<b>Microlights has been dealing directly with end retailers</b> and developing smart lighting solutions for major utilities and others for over 22 years, and is proud of the long standing.",
    name: "Name Dummy Text",
    company: "Company",
  },
  {
    id: 2,
    text: "<b>Microlights has been dealing directly with end retailers</b> and developing smart lighting solutions for major utilities and others for over 22 years, and is proud of the long standing.",    name: "Name Dummy Text",
    company: "Company",
  },
  {
    id: 3,
    text: "<b>Microlights has been dealing directly with end retailers</b> and developing smart lighting solutions for major utilities and others for over 22 years, and is proud of the long standing.",    name: "Name Dummy Text",
    company: "Company",
  },
  {
    id: 4,
    text: "<b>Microlights has been dealing directly with end retailers</b> and developing smart lighting solutions for major utilities and others for over 22 years, and is proud of the long standing.",    name: "Name Dummy Text",
    company: "Company",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="section-spacing bg-primary text-white">
      <div className="container">
        <div className="mb-[80px]">
      <h2 className="text-2xl leading-none">Testimonials</h2>
      </div>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1.2}
        spaceBetween={20}
        loop= {true}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="tsmnls"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="pt-[40px] relative before:absolute before:h-[1px] before:w-full before:top-0 before:bg-white itms">
              <p className="text-sm leading-relaxed text-[#B8B8B8]" dangerouslySetInnerHTML={{__html: testimonial.text}} />
           
              <div className="flex items-center gap-[15px] mt-[40px]">
                <div className="w-[45px] h-[45px] bg-gray-500 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-[20px]">{testimonial.name}</h3>
                  <p className="text-sm text-[#B8B8B8] text-[17px]">{testimonial.company}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
