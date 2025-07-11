"use client";
import { contactSchema } from "@/app/(user)/schemas/contactShema";
import { motion } from "motion/react";
import React from "react";
import { useForm } from "react-hook-form";
import { FiArrowUpRight } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import {toast} from "sonner"

interface ContactFormProps {
  name: string;
  phone: number;
  email: string;
  message: string;
}

export default function ContactForm() {

  const { register, handleSubmit, formState: { errors },reset } = useForm<ContactFormProps>({resolver:zodResolver(contactSchema)});

  const onSubmit = async(data: ContactFormProps) => {
    try {
      const response = await fetch("/api/admin/contact/enquiry",{
        method:"POST",
        body:JSON.stringify(data)
      })
      const res = await response.json()
      if(res.success){
        toast.success(res.message)
        reset()
      }else{
        toast.error(res.message)
      }
    } catch (error) {
      console.log("Error sending message",error)
      toast.error("Sorry, something went wrong. Please try again later.")
    }
  }

  return (
    <section  >
      <div className="container">
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
        <div className=" border-b border-black pb-100">
        <div className="bg-black text-white py-16 px-4 md:px-16">
          <h2 className="text-3xl md:text-lg  mb-6 lg:mb-10">Reach Out</h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <label className="text-[#ffffff50] block mb-2">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full bg-black border-b border-[#ffffff50] focus:outline-none focus:border-white  text-white"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div className="relative">
                <label className="text-[#ffffff50] block mb-2">Phone</label>
                <input
                  type="text"
                  {...register("phone")}
                  className="w-full bg-black border-b border-[#ffffff50] focus:outline-none focus:border-white  text-white"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
              </div>
              <div className="relative">
                <label className="text-[#ffffff50] block mb-2">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full bg-black border-b border-[#ffffff50] focus:outline-none focus:border-white  text-white"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            {/* Message Field */}
            <div className="relative">
              <label className="text-[#ffffff50] block mb-2">Message</label>
              <textarea {...register("message")} className="w-full bg-black border-b border-[#ffffff50] focus:outline-none focus:border-white  text-white h-24 md:h-35 resize-none"></textarea>
              {errors.message && <p className="text-red-500">{errors.message.message}</p>}
            </div>

            {/* Send Button */}
            <div
              
              className="flex items-center gap-2   mt-6 md:mt-[81px] transition duration-300"
            >
              <div className="flex">
                <button
                 type="submit"
                  className="flex gap-[20px] items-center border-t border-white text-sm text-white border-solid leaing-none pt-[12px] cursor-pointer"
                >
                  Send <FiArrowUpRight className="text-[22px] text-white" />
                </button>
              </div>
            </div>
          </form>
        </div>
          </div>
          </motion.div>
      </div>
    </section>
  );
};



