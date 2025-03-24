"use client";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const Address = () => {
  return (
    <section  >
      <div className="container">
      <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
        <div className=" border-b border-black pb-100">
        <div className="bg-black text-white py-16 px-4 md:px-16">
          <h2 className="text-3xl md:text-lg  mb-6 lg:mb-10">Reach Out</h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <label className="text-[#ffffff50] block mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-black border-b border-[#ffffff50] focus:outline-none focus:border-white  text-white"
                />
              </div>
              <div className="relative">
                <label className="text-[#ffffff50] block mb-2">Phone</label>
                <input
                  type="text"
                  className="w-full bg-black border-b border-[#ffffff50] focus:outline-none focus:border-white  text-white"
                />
              </div>
              <div className="relative">
                <label className="text-[#ffffff50] block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-black border-b border-[#ffffff50] focus:outline-none focus:border-white  text-white"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="relative">
              <label className="text-[#ffffff50] block mb-2">Message</label>
              <textarea className="w-full bg-black border-b border-[#ffffff50] focus:outline-none focus:border-white  text-white h-24 md:h-35 resize-none"></textarea>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="flex items-center gap-2   mt-6 md:mt-[81px] transition duration-300"
            >
              <div className="flex">
                <Link
                  href={"/"}
                  className="flex gap-[20px] items-center border-t border-white text-sm text-white border-solid leaing-none pt-[12px]"
                >
                  Send <FiArrowUpRight className="text-[22px] text-white" />
                </Link>
              </div>
            </button>
          </form>
        </div>
          </div>
          </motion.div>
      </div>
    </section>
  );
};

export default Address;
