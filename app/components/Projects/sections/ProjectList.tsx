"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/app/lib/services/service.projects";
import ArrowButton from "../../v2/common/ArrowButton";

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
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-x-[40px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {data?.map((project) => (
                <div
                  key={project.slug}
                  className="group mb-10 md:mb-12 lg:mb-15"
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div
                      data-reveal="content"
                      className="flex items-start justify-between gap-[20px]"
                    >
                      <h3 className="text-subtitle text-black whitespace-pre-line line-clamp-2 !mb-0">
                        {project.name}
                      </h3>
                      <ArrowButton
                        as="span"
                        tone="dark"
                        className="shrink-0"
                      />
                    </div>

                    <p
                      data-reveal="content"
                      className="text-description-2 text-[#4A5565] !mb-0"
                    >
                      Industry: {project.industry}
                      <span className="mx-[10px]">|</span>
                      Scope: {project.scope}
                    </p>
                    <div className="mt-[16px] lg:mt-[25px]">
                      <figure className="h-[325px] md:h-[380px] lg:h-[425px] xl:h-[475px] w-full overflow-hidden">
                        <div className="h-full w-full">
                          <Image
                            className="h-full w-full object-cover object-center   group-hover:scale-[1.1] transition-all ease-in-out duration-500"
                            src={project.thumbnail}
                            alt={project.thumbnailAlt}
                            width={950}
                            height={950}
                          />
                        </div>
                      </figure>
                    </div>
                    {/* <div className="flex items-center justify-between border-b border-[#00000010] pb-3">
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
                    </div> */}
                  </Link>
                </div>
              ))}
            </motion.div>
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
