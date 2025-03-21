"use client";
import React    from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";



const Blogdetails = () => {


  return (
    <>
      <section className="ptc-130 pb-10  ">
        <div className="container">
          <div className="flex gap-5 lg :gap-10 xl:gap-[70px]">
            <div className="w-4/5">
              <div>
                <figure className="    w-full h-full ">
                  <Image
                    src={assets.dtaildimg}
                    alt="bnr"
                    className="w-full h-full  "
                  />
                </figure>
              </div>
              <div className="font-[300] mt-2 md:mt-4 lg:mt-12 pt-4">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>

                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
              </div>
            </div>
            <div className="w-1/5">
              <div>
                <p>Share</p>
                <div className="flex gap-3">

                <div className="w-10 h-10 bg-black flex justify-center items-center rounded-3xl"><Image src={assets.lin} alt=""></Image></div>
                <div className="w-10 h-10 bg-black flex justify-center items-center rounded-3xl"><Image src={assets.insta} alt=""></Image></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="border-b border-black"></div>
      </div>
    </>
  );
};

export default Blogdetails;
