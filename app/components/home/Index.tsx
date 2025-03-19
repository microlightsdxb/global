import React from 'react'

import HeroSection from './sections/HeroSection'
import RecentProjects from './sections/Project'
import Testimonials from './sections/Testimonials'
import ProdSec from './sections/ProdSec'

import ProcessTimeline from './sections/ProcessTimeline'
import AboutSec from './sections/AboutSec'
import IndustriesServed from './sections/IndustriesServed'







const Index = () => {
  return (
    <>
  <HeroSection/>
    <ProdSec/>

   <IndustriesServed/>
    <AboutSec/>
    <ProcessTimeline/>
    <RecentProjects/>
    <Testimonials/>
    </>
  )
}

export default Index