"use client"

import React, { useEffect, useState } from "react";


import Filter from "./sections/Filter";

import ProjectList from "./sections/ProjectList";
import useSWR from "swr";

interface FrameworkItem {
  _id: string;
  name: string;
  slug: string;
  category: string;
  location: string;
  thumbnail: string;
  thumbnailAlt: string;
  industry: string;
  images: string[];
}

const Index = () => {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data } = useSWR(`/api/admin/project`, fetcher)
  const {data: industryData} = useSWR(`/api/admin/industry`, fetcher)
  const {data: locationData} = useSWR(`/api/admin/location`, fetcher)
  const [projects, setProjects] = useState<FrameworkItem[]>([])
  const [industrySelected, setIndustrySelected] = useState<string>("")
  const [locationSelected, setLocationSelected] = useState<string>("")
  const [newVisible,setNewVisible] = useState<number>(0)
    const [buttonVisible,setButtonVisible] = useState(true)
    const [selectedLocations,setSelectedLocations] = useState<string[]>([])
  const limit = 8

  useEffect(() => {
    if(!data){
      return
    }
    setProjects((prev)=>{
      if(!prev || newVisible === 0){
        return data?.data.slice(0,limit)
      }
      return [...prev,...data?.data.slice(newVisible,newVisible+limit)]
    
    })
  }, [data,newVisible])

  useEffect(()=>{
    if(projects?.length > 8){
      setButtonVisible(false)
    }
  },[projects])


  useEffect(()=>{

    console.log(industrySelected,locationSelected)

    if(!industrySelected && selectedLocations.length==0){
      setProjects(data?.data.slice(0,limit))
      setNewVisible(0)
      return;
    }

    if(industrySelected=="Industry" && selectedLocations.length==0){
      setProjects(data?.data.slice(0,limit))
      setNewVisible(0)
      return;
    }

    if(selectedLocations.length==0 && !industrySelected){
      console.log("here")
      setProjects(data?.data.slice(0,limit))
      setNewVisible(0)
      return;
    }


    if(industrySelected=="Industry"  && selectedLocations.length==0){
      console.log("correct")
      setProjects(data?.data.slice(0,limit))
      setNewVisible(0)
      return;
    }else{
      if(industrySelected!=="Industry"  && selectedLocations.length!==0){
        
          if(!industrySelected){
            const filteredProjects = data?.data?.filter((project: {industry: string, location: string})=>selectedLocations.includes(project.location))
            setProjects(filteredProjects)
            console.log("here yeah")
            return;
          }else if(selectedLocations.length==0){
            const filteredProjects = data?.data?.filter((project: {industry: string, location: string})=>project.industry === industrySelected)
            setProjects(filteredProjects)
            return;
          }else{
            const filteredProjects = data?.data?.filter((project: {industry: string, location: string})=>project.industry === industrySelected && selectedLocations.includes(project.location))
            setProjects(filteredProjects)
            return;
          }

      }else if(industrySelected!=="Industry"){
          const filteredProjects = data?.data?.filter((project: {industry: string, location: string})=>project.industry === industrySelected)
          setProjects(filteredProjects)
          return;
        }else if(selectedLocations.length!==0){
          console.log(selectedLocations)
          const filteredProjects = data?.data?.filter((project: {industry: string, location: string})=>selectedLocations.includes(project.location)) 
          setProjects(filteredProjects)
          return;
        }
      }

  },[industrySelected, locationSelected,selectedLocations])

  // useEffect(()=>{
  //   console.log(selectedLocations)
  // },[selectedLocations])

  return (
    <>
      <div className="headerpadding"> </div>
      <Filter industryData={industryData} locationData={locationData} setIndustrySelected={setIndustrySelected} setLocationSelected={setLocationSelected} selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations}/>
      <ProjectList data={projects} setNewVisible={setNewVisible} newVisible={newVisible} limit={limit} buttonVisible={buttonVisible} setButtonVisible={setButtonVisible}/>
    </>
  );
};

export default Index;
