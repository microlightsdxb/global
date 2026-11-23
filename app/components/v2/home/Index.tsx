"use client"

import React from 'react'

import HeroSection from './sections/HeroSection'
import ProjectsSec from './sections/ProjectsSec'
import ProdSec from './sections/ProdSec'

import AboutSec from './sections/AboutSec'
import SectorsSec from './sections/SectorsSec'
import { Home } from '@/types/Home'
import { heroData, aboutData, productsData, sectorsData, projectsData, whatWeDoData, ctaBannerData, testimonialsData } from '@/app/(v2)/v2/home/data'
import TestimonialsSec from './sections/TestimonialsSec'
import CtaBannerSec from './sections/CtaBannerSec'
import WhatWeDoSec from './sections/WhatWeDoSec'


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

const IndexV2 = ({ homeData,typeData,projectData }: { homeData: Home,typeData:typeData,projectData:projectData }) => {


  return (
    <div>
      <HeroSection data={heroData} />
      <AboutSec content={aboutData} data={homeData} />
      <ProdSec content={productsData} data={typeData} />
      <SectorsSec data={sectorsData} />
      {/* <ProcessTimeline data={homeData} /> */}
      <ProjectsSec data={projectsData} />
      <WhatWeDoSec data={whatWeDoData} />
      <TestimonialsSec data={testimonialsData} />
      <CtaBannerSec data={ctaBannerData} />
    </div>
  )
}

export default IndexV2