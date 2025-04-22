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
    console.log(projects)
  },[projects])


  useEffect(()=>{

    console.log(industrySelected,locationSelected)

    if(!industrySelected && !locationSelected){
      setProjects(data?.data.slice(0,limit))
      setNewVisible(0)
      return;
    }

    if(industrySelected=="Industry" && !locationSelected){
      setProjects(data?.data.slice(0,limit))
      setNewVisible(0)
      return;
    }

    if(locationSelected=="Location" && !industrySelected){
      console.log("here")
      setProjects(data?.data.slice(0,limit))
      setNewVisible(0)
      return;
    }


    if(industrySelected=="Industry"  && locationSelected=="Location"){
      console.log("correct")
      setProjects(data?.data.slice(0,limit))
      setNewVisible(0)
      return;
    }else{
      if(industrySelected!=="Industry"  && locationSelected!=="Location"){
          if(!industrySelected){
            const filteredProjects = data?.data?.filter((project: {industry: string, location: string})=>project.location === locationSelected)
            setProjects(filteredProjects)
            return;
          }else if(!locationSelected){
            const filteredProjects = data?.data?.filter((project: {industry: string, location: string})=>project.industry === industrySelected)
            setProjects(filteredProjects)
            return;
          }else{
            const filteredProjects = data?.data?.filter((project: {industry: string, location: string})=>project.industry === industrySelected && project.location === locationSelected)
            setProjects(filteredProjects)
            return;
          }

      }else if(industrySelected!=="Industry"){
          const filteredProjects = data?.data?.filter((project: {industry: string, location: string})=>project.industry === industrySelected)
          setProjects(filteredProjects)
          return;
        }else if(locationSelected!=="Location"){
          const filteredProjects = data?.data?.filter((project: {industry: string, location: string})=>project.location === locationSelected) 
          setProjects(filteredProjects)
          return;
        }
      }

  },[industrySelected, locationSelected])

  return (
    <>
      <div className="headerpadding"> </div>
      <Filter industryData={industryData} locationData={locationData} setIndustrySelected={setIndustrySelected} setLocationSelected={setLocationSelected}/>
      <ProjectList data={projects} setNewVisible={setNewVisible} newVisible={newVisible} limit={limit} buttonVisible={buttonVisible} setButtonVisible={setButtonVisible}/>
    </>
  );
};

export default Index;
