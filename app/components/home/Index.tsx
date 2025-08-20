"use client"

import React from 'react'

import HeroSection from './sections/HeroSection'
import RecentProjects from './sections/Project'
import Testimonials from './sections/Testimonials'
import ProdSec from './sections/ProdSec'

import AboutSec from './sections/AboutSec'
import IndustriesServed from './sections/IndustriesServed'
import { Home } from '@/types/Home'


type typeData = {
    data: {
        _id: string;
        type: string;
        image: string;
        hoverImage: string;
    }[];
}

type projectData = {
  data: {
    _id: string,
    name: string,
    client: string,
    location: string,
    thumbnail: string,
    slug: string
  }[]
}

const Index = ({ homeData,typeData,projectData }: { homeData: Home,typeData:typeData,projectData:projectData }) => {


  return (
    <div>
      <HeroSection data={homeData} />
      <ProdSec data={typeData} />
      <IndustriesServed data={homeData} />
      <AboutSec data={homeData} />
      {/* <ProcessTimeline data={homeData} /> */}
      <RecentProjects data={projectData} />
      <Testimonials data={homeData} />
    </div>
  )
}

export default Index