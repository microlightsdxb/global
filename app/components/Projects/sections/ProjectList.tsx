"use client";
import React from "react";

import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/app/lib/services/service.projects";

const projectCardEase = [0.22, 1, 0.36, 1] as const;

interface FrameworkSectionProps {
  data: Project[];
  hasMore: boolean;
  onLoadMore: () => void;
}

const ProjectList: React.FC<FrameworkSectionProps> = ({
  data,
  hasMore,
  onLoadMore,
}) => {
  return (
    <section className=" ">
      <div className="container">
        {data.length === 0 ? (
          <p className="text-center text-lg text-black leading-[1.4]">
            No projects found
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[40px]">
              <AnimatePresence>
                {data?.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: (index % 8) * 0.04,
                      ease: projectCardEase,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <Link href={`/projects/${project.slug}`}>
                      <div className="mb-10 ">
                        <figure className="h-[325px] md:h-[380px] lg:h-[425px] xl:h-[475px] w-full overflow-hidden">
                          <motion.div className="h-full w-full">
                            <Image
                              className="h-full w-full object-cover object-center   group-hover:scale-[1.1] transition-all ease-in-out duration-500"
                              src={project.thumbnail}
                              alt={project.thumbnailAlt}
                              width={950}
                              height={950}
                            />
                          </motion.div>
                        </figure>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#00000010] pb-3">
                        <h2 className="text-lg text-black leading-[1.4]">
                          {project.name}
                        </h2>

                        <div>
                          <div className="flex group-hover:flex transition-all ease-in-out duration-500 justify-end">
                            <div className="flex gap-[20px] items-center justify-end text-white border-t border-black text-sm w-[61px] border-solid leading-none pt-[12px] cursor-pointer group-hover:text-black group-hover:border-black">
                              <FiArrowUpRight className="text-[22px] text-[#7D7D7D] group-hover:text-black group-hover: scale-125 transition-all ease-in-out duration-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 mb-4 md:mb-6 xl:mb-20">
                        <p
                          data-reveal="content"
                          className="mt-[10px] text-description-2 text-[#4A5565] !mb-0"
                        >
                          Industry: {project.industry}
                          <span className="mx-[10px]">|</span>
                          Scope: {project.scope}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.5 }}
                onClick={onLoadMore}
              >
                <div className="pb-100 border-b border-black cursor-pointer">
                  <div className="py-7 text-center text-black bg-[#D9D9D9] max-w-[220px] md:max-w-[370px] m-auto pb">
                    Load More
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectList;
