"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";


export default function Projects() {

  const [oldIndustry, setOldIndustry] = useState<string>("");
  const [oldLocation, setOldLocation] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [projectList, setProjectList] = useState<{_id: string, name: string, client: string, industry: string, scope: string, location: string, description: string}[]>([]);
  const [locationList, setLocationList] = useState<{_id: string, name: string}[]>([]);
  const [industryList, setIndustryList] = useState<{_id: string, name: string}[]>([]);
  const router = useRouter();

  const handleFetchProjects = async() => {
    try {
      const response = await fetch("/api/admin/project");
      if(response.ok) {
        const data = await response.json();
        setProjectList(data.data);
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching industry", error);
    }
  }
  
  const handleAddIndustry = async() => {
    try {
      const response = await fetch("/api/admin/industry",{
        method: "POST",
        body: JSON.stringify({ name: industry }),
      });
      if(response.ok) {
        const data = await response.json();
        setIndustry("");
        alert(data.message);
        handleFetchIndustry();
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding industry", error);
    }
  }

  const handleFetchIndustry = async() => {
    try {
      const response = await fetch("/api/admin/industry");
      if(response.ok) {
        const data = await response.json();
        setIndustryList(data.data);
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching industry", error);
    }
  }

  const handleEditIndustry = async(id: string) => {
    try {
      const response = await fetch(`/api/admin/industry?id=${id}`,{
        method: "PATCH",
        body: JSON.stringify({ name: industry ,  oldName: oldIndustry }),
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchIndustry();
        setOldIndustry("");
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error editing industry", error);
    }
  }

  const handleDeleteIndustry = async(id: string) => {
    try {
      const response = await fetch(`/api/admin/industry?id=${id}`,{
        method: "DELETE",
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchIndustry();
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting industry", error);
    }
  }


  const handleFetchLocation = async() => {
    try {
      const response = await fetch("/api/admin/location");
      if(response.ok) {
        const data = await response.json();
        setLocationList(data.data);
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching location", error);
    }
  }

  const handleAddLocation = async() => {
    try {
      const response = await fetch("/api/admin/location",{
        method: "POST",
        body: JSON.stringify({ name: location }),
      });
      if(response.ok) {
        const data = await response.json();
        setLocation("");
        alert(data.message);
        handleFetchLocation();
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding location", error);
    }
  }

  const handleEditLocation = async(id: string) => {
    try {
      const response = await fetch(`/api/admin/location?id=${id}`,{
        method: "PATCH",
        body: JSON.stringify({ name: location, oldName: oldLocation }),
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchLocation();
        setOldLocation("");
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error editing location", error);
    }
  }

  const handleDeleteLocation = async(id: string) => {
    try {
      const response = await fetch(`/api/admin/location?id=${id}`,{
        method: "DELETE",
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting location", error);
    }
  }

  const handleDeleteProject = async(id: string) => {
    try {
      const response = await fetch(`/api/admin/project?id=${id}`,{
        method: "DELETE",
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchProjects();
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting project", error);
    }
  }

  useEffect(()=>{
    handleFetchProjects();
    handleFetchIndustry();
    handleFetchLocation();
  },[])

  return (
    <div className="h-screen grid grid-cols-2 gap-5">
      <div className="flex flex-col gap-2 h-screen">
        <div className="h-1/2 w-full p-2 border-2 border-gray-300 rounded-md overflow-y-auto">
          <div className="flex justify-between border-b-2 pb-2">
            <Label className="text-sm font-bold">Industry</Label>
            <Dialog>
              <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>setIndustry("")}>Add Industry</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Industry</DialogTitle>
                  <DialogDescription>
                    <Input type="text" placeholder="Industry Name" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                  </DialogDescription>
                </DialogHeader>
                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddIndustry}>Save</DialogClose>
              </DialogContent>

            </Dialog>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {industryList.map((item)=>(
              <div className="flex justify-between border p-1 items-center rounded-md" key={item._id}>
              <div>
                {item.name}
              </div>
              <div className="flex gap-5">
              <Dialog>
              <DialogTrigger onClick={()=>{setIndustry(item.name); setOldIndustry(item.name)}}><MdEdit/></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Industry</DialogTitle>
                  <DialogDescription>
                    <Input type="text" placeholder="Industry Name" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                  </DialogDescription>
                </DialogHeader>
                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditIndustry(item._id)}>Save</DialogClose>
              </DialogContent>

            </Dialog>



                <Dialog>
              <DialogTrigger><MdDelete/></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteIndustry(item._id)}>Yes</DialogClose>
                </div>

              </DialogContent>

            </Dialog>

              </div>
            </div>
            ))}
            
          </div>
        </div>


        <div className="h-1/2 w-full p-2 border-2 border-gray-300 rounded-md overflow-y-auto">
          <div className="flex justify-between border-b-2 pb-2">
            <Label className="text-sm font-bold">Location</Label>
            <Dialog>
              <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>setLocation("")}>Add Location</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Location</DialogTitle>
                  <DialogDescription>
                    <Input type="text" placeholder="Location Name" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </DialogDescription>
                </DialogHeader>
                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddLocation}>Save</DialogClose>
              </DialogContent>

            </Dialog>
          </div>
          <div className="">

          <div className="mt-2 flex flex-col gap-2">
          {locationList.map((item)=>(
              <div className="flex justify-between border p-1 items-center rounded-md" key={item._id}>
              <div>
                {item.name}
              </div>
              <div className="flex gap-5">
              <Dialog>
                <DialogTrigger onClick={()=>{setLocation(item.name); setOldLocation(item.name)}}><MdEdit/></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Location</DialogTitle>
                    <DialogDescription>
                      <Input type="text" placeholder="Location Name" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditLocation(item._id)}>Save</DialogClose>
                </DialogContent>
  
              </Dialog>



                <Dialog>
              <DialogTrigger><MdDelete/></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteLocation(item._id)}>Yes</DialogClose>
                </div>

              </DialogContent>

            </Dialog>

              </div>
            </div>
          ))}
          
        </div>

          </div>
        </div>

      </div>

      <div className="h-screen w-full p-2 border-2 border-gray-300 rounded-md overflow-y-auto">
        <div className="flex justify-between border-b-2 pb-2">
          <Label className="text-sm font-bold">Projects</Label>
          <Button onClick={()=>router.push("/admin/projects/add")}>Add Project</Button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {projectList.map((item)=>(
            <div className="flex justify-between border p-1 items-center rounded-md" key={item._id}>
            <div>
              {item.name}
            </div>
            <div className="flex gap-5">
              <MdEdit onClick={()=>router.push(`/admin/projects/edit/${item._id}`)}/>
              
              <Dialog>
              <DialogTrigger><MdDelete/></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteProject(item._id)}>Yes</DialogClose>
                </div>

              </DialogContent>

            </Dialog>
            </div>
          </div>
          ))}
                      
          
        </div>
      </div>
    </div>
  );
}
