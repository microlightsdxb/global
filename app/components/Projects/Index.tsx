"use client"

import React, { useEffect, useState } from "react";


import Filter from "./sections/Filter";

import ProjectList from "./sections/ProjectList";
import useSWR from "swr";


const Index = () => {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data } = useSWR(`/api/admin/project`, fetcher)
  const {data: industryData} = useSWR(`/api/admin/industry`, fetcher)
  const {data: locationData} = useSWR(`/api/admin/location`, fetcher)
  const [projects, setProjects] = useState([])
  const [industrySelected, setIndustrySelected] = useState<string>("")
  const [locationSelected, setLocationSelected] = useState<string>("")

  useEffect(() => {
    setProjects(data?.data)
  }, [data])

  useEffect(()=>{
    if(!industrySelected && !locationSelected){
      setProjects(data?.data)
      return;
    }
    if(industrySelected=="Industry" && locationSelected=="Location"){
      setProjects(data?.data)
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
      <Filter industryData={industryData} locationData={locationData} setIndustrySelected={setIndustrySelected} setLocationSelected={setLocationSelected} locationSelected={locationSelected} industrySelected={industrySelected}/>
      <ProjectList data={projects} />
    </>
  );
};

export default Index;
