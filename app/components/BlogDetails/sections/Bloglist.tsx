"use client";
import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
interface RecentBlogItem {
    _id:string,
    title:string,
    image:string,
    imageAlt:string,
    category:string,
  createdAt: string,
  slug: string;
  }

interface FrameworkSectionProps {
  categories: string[];
  data: RecentBlogItem[];
}

const Bloglist: React.FC<FrameworkSectionProps> = ({ data }) => {

  // const filteredData =  data
  //       .filter((member) => member)
  //       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  //       .slice(0, 3);

  console.log(data)

  return (
    <>
      <section className="pt-3  ">
        <div className=" ">
<div className="pmargin0">
            <p className="text-lg text-black pt-4 lg:pt-8 pb-4 lg:pb-6 border-t border-black mt-5 md:mt-12">Recent Blogs</p>
            </div>
          <div className=" ">
            {data?.map((member, index) => (
              <div key={index} >
                <div className="evecont h-[200px]  sm:h-[300px] lg:h-[200px] overflow-hidden"  >
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    className="w-full h-auto object-center object-cover"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="pt-2 md:pt-3 lg:pt-4 ">
                  <Link href={`/blog-details/${member.slug}`} >
                  <p className=" text-black leading-[1.4]  ">
                    {member.title}
                    </p>
                    </Link>
                </div>
                <div className="flex justify-between items-center pmargin0 pt-2 pb-8 border-b mb-5 md:mb-10">
                  <p className="text-[15px]">{member.category}</p>
                  <p className="text-[15px]">{moment(member.createdAt).format("ll")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Bloglist;
