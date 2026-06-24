"use client";
import { contactSchema } from "@/app/(user)/schemas/contactShema";
import { motion } from "motion/react";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiArrowUpRight } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactFormProps {
  name: string;
  phone: number;
  email: string;
  message: string;
  company: string;
}

export default function ContactForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormProps>({ resolver: zodResolver(contactSchema) });

  const recaptcha = useRef<ReCAPTCHA>(null)
  const [error, setError] = useState("")

  const onSubmit = async (data: ContactFormProps) => {
    try {
      const captchaValue = recaptcha?.current?.getValue()
      if (!captchaValue) {
        setError("Please verify yourself to continue")
        return;
      }
      setError("")
      const response = await fetch("/api/admin/contact/enquiry", {
        method: "POST",
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.success) {
        toast.success(res.message)
        reset()
        recaptcha?.current?.reset()
        router.push("/thankyou")
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log("Error sending message", error)
      toast.error("Sorry, something went wrong. Please try again later.")
    }
  }

  return (
    <section  >
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="">
            <div className="bg-black text-white p-5 md:p-12.5">
              <h2 className="text-3xl md:text-lg  mb-6 lg:mb-12.5">Reach Out</h2>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6 xl:gap-12.5">
                  <div className="relative">
                    <label className="text-white/50 block mb-2">Name</label>
                    <input
                      type="text"
                      {...register("name")}
                      className="w-full bg-black border-b border-[#595959] focus:outline-none focus:border-white  text-white"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="relative">
                    <label className="text-white/50 block mb-2">Phone</label>
                    <input
                      type="text"
                      {...register("phone")}
                      className="w-full bg-black border-b border-[#595959] focus:outline-none focus:border-white  text-white"
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                  </div>
                  <div className="relative">
                    <label className="text-white/50 block mb-2">Email</label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full bg-black border-b border-[#595959] focus:outline-none focus:border-white  text-white"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="mt-6 xl:mt-12.5">
                  <div className="relative">
                    <label className="text-white/50 block mb-2">Company</label>
                    <input
                      type="text"
                      {...register("company")}
                      className="w-full bg-black border-b border-[#595959] focus:outline-none focus:border-white  text-white"
                    />
                    {errors.company && <p className="text-red-500">{errors.company.message}</p>}
                  </div>
                </div>
                {/* Message Field */}
                <div className="mt-6 xl:mt-12.5">

                  <div className="relative">
                    <label className="text-white/50 block mb-2">Message</label>
                    <textarea {...register("message")} className="w-full bg-black border-b border-[#595959] focus:outline-none focus:border-white  text-white h-22 resize-none"></textarea>
                    {errors.message && <p className="text-red-500">{errors.message.message}</p>}
                  </div>
                </div>

                <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} ref={recaptcha} className='mt-5' />

                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                {/* Send Button */}
                <div

                  className="flex justify-start items-center gap-2 mt-6 md:mt-10 transition duration-300"
                >
                  <div className="flex">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex gap-[20px] items-center justify-between border-t border-white text-sm group text-white border-solid leaing-none pt-[12px] cursor-pointer min-w-[134px]"
                    >
                      Send <FiArrowUpRight className="text-[22px] text-white group-hover:rotate-45 transition-all duration-300" />
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



