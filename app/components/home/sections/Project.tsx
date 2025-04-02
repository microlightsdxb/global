"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
/* import { ChevronLeft, ChevronRight } from "lucide-react"; */
import {motion} from 'framer-motion';
import Link from "next/link";

/* const slideVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};
 */



interface Project {
  data:{
    _id: string,
    name: string,
    client: string,
    location: string,
    thumbnail: string
  }[]
}



const RecentProjects = ({data}:{data:Project}) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="section-spacing">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="mb-[80px]">
            <motion.h2 className="text-xl text-primary" initial={{opacity:0, x: -50}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.6}}
            viewport={{once:false, amount:0.5}}>Recent Projects</motion.h2>
          </div>
          <div className="relative flex">
            <button
              ref={prevRef}
              className=" bg-[#949494]  w-[50px] h-[50px] text-center flex items-center justify-center hover:opacity-60 cursor-pointer transition-500"
            >
               <BsChevronLeft className="text-white" size={20} />
            </button>
            <button
              ref={nextRef}
              className=" bg-[#7D7D7D] w-[50px] h-[50px] text-center flex items-center justify-center  hover:opacity-60 cursor-pointer transition-500"
            >
              <BsChevronRight className="text-white" size={20} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div initial={{opacity: 0, x: -50}}
          whileInView={{opacity: 1, x: 0}}
          transition={{duration: 0.5}}
          viewport={{once: false, amount: 0.5}}>
          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={40}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className=""
          >
            {data?.data?.slice(0,5).map((project) => (
              <SwiperSlide key={project._id}>
                <Link href={`/project-details/${project._id}`} className="overflow-hidden" >
                  <div className="hdrsc">
                    <div className="flex justify-between items-center border-b border-primary/10 pb-[14px]">
                      <h3 className="text-lg font-normal leading-none text-primary">
                        {project.name}
                      </h3>
                      <div className="flex">
                        <span className="border-t border-primary pt-[10px]">
                          <FiArrowUpRight className="ml-[40px] text-[22px] text-[#7D7D7D] transition-all ease-in-out duration-300 group-hover:ml-[30px] leading-none" />
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-[30px]">
                      <div>
                        <p className="text-sm text-[#7D7D7D]">
                          Client: {project.client}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[#7D7D7D]">
                          Location: {project.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Image
                    width={500}
                    height={500}
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full object-cover"
                  />
                  </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;
