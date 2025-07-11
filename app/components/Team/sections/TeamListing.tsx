"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp, staggerContainer } from "../../scrollanims";


interface FrameworkItem {
  name: string;
  designation: string;
  image: string;
  imageAlt: string;
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}
const TeamListing: React.FC<FrameworkSectionProps> = ({
  data

}) => {
  return (
    <>
      <section className="ptc-130 pb-10  ">
        <div className="container">
          <h2 className="text-xl font-medium leading-[1.3] mb-4 md:mb-15"> Our Team</h2>
          <motion.div variants={staggerContainer} viewport={{ once: true, amount: 0.2 }} >
            <div>
              <p className=" text-lg font-medium">MANAGEMENT</p>
              <motion.div variants={staggerContainer} viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 team-grid ">

                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                    Julian Beglar
                  </p>
                  <p>CEO</p>
                </motion.div>
              </motion.div>
            </div>
            <div>
              <p className=" text-lg font-medium">HR, LEGAL & OPERATIONS DEPARTMENT              </p>
              <motion.div variants={staggerContainer} viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 team-grid ">

                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                    Lorraine Beglar
                  </p>
                  <p>Legal & Operations Director</p>
                </motion.div>
              </motion.div>
            </div>
            <div>
              <p className=" text-lg font-medium">SALES DEPARTMENT</p>
              <motion.div variants={staggerContainer} viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 team-grid ">

                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                    Steve Pratt
                  </p>
                  <p>Head of Sales</p>
                </motion.div>

                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                    David Hepburn
                  </p>
                  <p>Snr. Business Development Manager</p>
                </motion.div>

                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                    Tyrone de Gersigny
                  </p>
                  <p>Business Development Manager</p>
                </motion.div>

                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                    Ryan Beglar
                  </p>
                  <p>Business Development Manager</p>
                </motion.div>
              </motion.div>
            </div>
            <div>
              <p className=" text-lg font-medium">DESIGN DEPARTMENT</p>
              <motion.div variants={staggerContainer} viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 team-grid ">

                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                    Musheer Ahammed
                  </p>
                  <p>Head of Lighting Design, Projects & Engineering</p>
                </motion.div>
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                    Zahwa Khan
                  </p>
                  <p>Senior Lighting Designer</p>
                </motion.div>

                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                    Ansha A V
                  </p>
                  <p>Lighting Designer</p>
                </motion.div>
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                    Adrian Placino
                  </p>
                  <p>Design & Technical Support</p>
                </motion.div>

              </motion.div>
            </div> 
            
            <div>
              <p className=" text-lg font-medium">OFFICE & ADMIN DEPARTMENT</p>
              <motion.div variants={staggerContainer} viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 team-grid ">

              <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  Anita Kurien
                  </p>
                  <p>Senior Sales Coordinator</p>
                </motion.div>  
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  Rehana Shaik
                  </p>
                  <p>Sales Coordinator</p>
                </motion.div> 
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  Katelyn Dodds
                  </p>
                  <p>Sales Coordinator</p>
                </motion.div>  
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  Dorota Larronde-Larretche
                  </p>
                  <p>Sales Coordinator</p>
                </motion.div>  

	
	
	
	
	
	
	

	
	
	
	
	
	

              </motion.div>
            </div>
            
            <div>
              <p className=" text-lg font-medium">FINANCE DEPARTMENT	</p>
              <motion.div variants={staggerContainer} viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 team-grid ">

              <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                   Mutayab Khan  </p>
                  <p>Finance Manager</p>
                </motion.div>  
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  Ben Leonard
                  </p>
                  <p>Accountant</p> 
                </motion.div>   
              </motion.div>
            </div>
            
            <div>
              <p className=" text-lg font-medium">WAREHOUSE DEPARTMENT   </p>
              <motion.div variants={staggerContainer} viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 team-grid ">

              <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  Godfrey Pinto </p>
                  <p>Warehouse Manager</p>  

                </motion.div>  
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  Steffi Lazrado
                  </p>
                  <p>Warehouse Sales Coordinator</p>   
                </motion.div>   
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  George Cutinho
                  </p>
                  <p>Warehouse Operations</p>   
                </motion.div>   
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  Willie Centano
                  </p>
                  <p>Technician</p>   
                </motion.div>  
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  Novert Cabalar
                  </p>
                  <p>Technician</p>   
                </motion.div>   
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  Susantha Wijewardhana
                  </p>
                  <p>Warehouse Assistant</p>   
                </motion.div>  
                <motion.div variants={moveUp}
                  className="teammem teamsepaftr border-b pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                >
                  <div className="teamover">
                    <Image
                      src={'assets/img/team/lorrainebeglar.png'}
                      alt={'team'}
                      width={300}
                      height={300}
                      className="w-full h-auto "
                    />
                  </div>
                  <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
                  Asad Ali
                  </p>
                  <p>Driver</p>   
                </motion.div>  

              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="container">
        <div className="border-b border-black"></div>
      </div>
    </>
  );
};

export default TeamListing;
