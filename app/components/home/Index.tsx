"use client"

import React, { useEffect } from 'react'

import HeroSection from './sections/HeroSection'
import RecentProjects from './sections/Project'
import Testimonials from './sections/Testimonials'
import ProdSec from './sections/ProdSec'

import ProcessTimeline from './sections/ProcessTimeline'
import AboutSec from './sections/AboutSec'
import IndustriesServed from './sections/IndustriesServed'
import useSWR from 'swr'
import { Home } from '@/types/Home'


const Index = ({homeData}:{homeData:Home}) => {
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }: { data: {data: {_id: string, type: string, image: string, hoverImage: string}[] } } = useSWR(`/api/admin/product/type`, fetcher)
  const { data:projectData }: { data: {data: {_id: string, name: string, client: string, location: string, thumbnail: string}[] } } = useSWR(`/api/admin/project`, fetcher)

  useEffect(() => {
    console.log(homeData)
    console.log(data)
    console.log(projectData)
  }, [data,projectData])

  return (
    <div>
  <HeroSection data={homeData}/>
    <ProdSec data={data}/>

   <IndustriesServed/>
    <AboutSec data={homeData}/>
    <ProcessTimeline data={homeData}/>
    <RecentProjects data={projectData}/>
    <Testimonials data={homeData}/>
    </div>
  )
}

export default Index