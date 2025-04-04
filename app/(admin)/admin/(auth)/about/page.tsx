"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { Textarea } from "@/components/ui/textarea";

interface AboutData {
    _id: string;
    title: string;
    description: string;
    image: string;
    sectionTwoImage: string;
    missionDescription: string;
    visionDescription: string;
    valuesDescription: string;
    missionIcon: string;
    visionIcon: string;
    valuesIcon: string;
}

interface WhyUs {
    _id: string;
    icon: string;
    title: string;
    description: string;
    bottomIcon: string;
}


export default function About() {

    const { register, handleSubmit, setValue, watch, control } = useForm<AboutData>();
    const [icon, setIcon] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [bottomIcon, setBottomIcon] = useState<string>("");
    const [whyUsList, setWhyUsList] = useState<WhyUs[]>([]);

    const handleFetchIntroSection = async () => {
        try {
            const response = await fetch("/api/admin/about/intro");
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    setValue("title", data.data.introTitle);
                    setValue("image", data.data.introImage);
                    setValue("description", data.data.introDescription);
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching intro section", error);
        }
    }

    const handleFetchSecondSection = async () => {
      try {
          const response = await fetch("/api/admin/about/second");
          if (response.ok) {
              const data = await response.json();
              if (data.data) {
                  setValue("missionDescription", data.data.mission.description);
                  setValue("visionDescription", data.data.vision.description);
                  setValue("valuesDescription", data.data.values.description);
                  setValue("missionIcon", data.data.mission.icon);
                  setValue("visionIcon", data.data.vision.icon);
                  setValue("valuesIcon", data.data.values.icon);
                  setValue("sectionTwoImage", data.data.sectionTwoImage);
              }
          } else {
              const data = await response.json();
              alert(data.message);
          }
      } catch (error) {
          console.log("Error fetching intro section", error);
      }
  }


    const handleFetchWhyUs = async () => {
        try {
            const response = await fetch("/api/admin/about/why-us");
            if (response.ok) {
                const data = await response.json();
                setWhyUsList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching why us", error);
        }
    }

    const handleAddItem = async () => {
        try {
            const response = await fetch("/api/admin/about/why-us", {
                method: "POST",
                body: JSON.stringify({ icon, title, description }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchWhyUs();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding item", error);
        }
    }

    const handleEditItem = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/about/why-us?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ title, description, icon }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchWhyUs();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing item", error);
        }
    }

    const handleDeleteItem = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/about/why-us?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchWhyUs();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting item", error);
        }
    }


    useEffect(() => {
        handleFetchIntroSection();
        handleFetchSecondSection();
        handleFetchWhyUs();
    }, [])

    const submitIntroSection = async (data: AboutData) => {
        try {
          const formData = new FormData();
          formData.append("title", data.title);
          formData.append("description", data.description);
          formData.append("image", data.image);
            const response = await fetch("/api/admin/about/intro", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error saving details", error);
        }
    }

    const submitSecondSection = async (data: AboutData) => {
        try {
          const formData = new FormData();
          formData.append("missionDescription", data.missionDescription);
          formData.append("visionDescription", data.visionDescription);
          formData.append("valuesDescription", data.valuesDescription);
          formData.append("missionIcon", data.missionIcon);
          formData.append("visionIcon", data.visionIcon);
          formData.append("valuesIcon", data.valuesIcon);
          formData.append("secondSectionImage", data.sectionTwoImage);
          const response = await fetch("/api/admin/about/second", {
            method: "POST",
            body: formData,
          });
          if(response.ok){
            const data = await response.json();
            alert(data.message);
          }else{
            const data = await response.json();
            alert(data.message);
          }
        } catch (error) {
          console.log("Error saving details", error);
        }
    }

    return (
        <div className="h-screen grid grid-cols-1 gap-5">
            <form className="h-full w-full p-2 border-2 border-gray-300 rounded-md" onSubmit={handleSubmit(submitIntroSection)}>
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Intro Section</Label>
                    <Button type="submit">Save</Button>
                </div>
                <div className="mt-2 flex flex-col gap-2 h-fit">
                    <div>
                        <Label className="text-sm font-bold">Title</Label>
                        <Input type="text" placeholder="Title" {...register("title")} />
                    </div>
                    <div>
                        <Label className="text-sm font-bold">Description</Label>
                        <Controller name="description" control={control} rules={{ required: "Content is required" }} render={({ field }) => {
                            return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                        }} />
                    </div>
                    <div>
                        <Label className="text-sm font-bold">Image</Label>
                        <ImageUploader onChange={(url) => setValue("image", url)} value={watch("image")} />
                    </div>
                </div>
            </form>




            <div className="h-full w-full">
                
            <form className="h-fit w-full p-2 border-2 border-gray-300 rounded-md" onSubmit={handleSubmit(submitSecondSection)}>
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Second Section</Label>
                    <Button type="submit">Save</Button>
                </div>
                <div>
                  <Label className="text-sm font-bold">Image</Label>
                  <ImageUploader onChange={(url) => setValue("sectionTwoImage", url)} value={watch("sectionTwoImage")} />
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 h-fit">
                  <div className="flex gap-2 flex-col rounded-md border-2 border-gray-300 p-2">
                    <div className="flex justify-center items-center">
                        <Label className="text-sm font-bold">Mission</Label>
                    </div>
                    <div>
                        <Label className="text-sm font-bold">Description</Label>
                        <Textarea placeholder="Description" {...register("missionDescription")} className="min-h-36"/>
                    </div>
                    <div>
                      <ImageUploader onChange={(url) => setValue("missionIcon", url)} value={watch("missionIcon")} />
                    </div>
                  </div>

                  <div className="flex gap-2 flex-col rounded-md border-2 border-gray-300 p-2">
                  <div className="flex justify-center items-center">
                        <Label className="text-sm font-bold">Vision</Label>
                    </div>
                    <div>
                        <Label className="text-sm font-bold">Description</Label>
                        <Textarea placeholder="Description" {...register("visionDescription")} className="min-h-36"/>
                    </div>
                    <div>
                      <ImageUploader onChange={(url) => setValue("visionIcon", url)} value={watch("visionIcon")} />
                    </div>
                  </div>

                  <div className="flex gap-2 flex-col rounded-md border-2 border-gray-300 p-2">
                  <div className="flex justify-center items-center">
                        <Label className="text-sm font-bold">Values</Label>
                    </div>
                    <div>
                        <Label className="text-sm font-bold">Description</Label>
                        <Textarea placeholder="Description" {...register("valuesDescription")} className="min-h-36"/>
                    </div>
                    <div>
                      <ImageUploader onChange={(url) => setValue("valuesIcon", url)} value={watch("valuesIcon")} />
                    </div>
                  </div>

                </div>
            </form>

            <div className="h-fit w-full p-2 border-2 border-gray-300 rounded-md mt-5">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Why Us</Label>
                    <Dialog>
                        <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => { setIcon(""); setTitle(""); setDescription(""); }}>Add Item</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Item</DialogTitle>
                                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                    <div>
                                        <Label>Icon</Label>
                                        <ImageUploader onChange={(url) => setIcon(url)} value={icon} />
                                    </div>
                                    <div>
                                        <Label>Bottom Icon</Label>
                                        <ImageUploader onChange={(url) => setBottomIcon(url)} value={bottomIcon} />
                                    </div>
                                    <div>
                                        <Label>Title</Label>
                                        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-36"/>
                                    </div>
                                </div>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddItem}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                    {whyUsList.map((item, index) => (
                        <div key={index} className="relative flex  justify-between border p-1 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <Image src={item.icon} alt={item.title} width={100} height={100} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold">{item.title}</h3>
                                </div>
                            </div>
                            <div className="absolute top-1 right-1 flex gap-2">
                                <Dialog>
                                    <DialogTrigger className=" text-white px-2 py-1 rounded-md" onClick={() => { setTitle(item.title); setDescription(item.description); setIcon(item.icon); setBottomIcon(item.bottomIcon); }}>

                                            <MdEdit className="text-black cursor-pointer"/>

                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Item</DialogTitle>
                                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                                <div>
                                                    <Label>Icon</Label>
                                                    <ImageUploader onChange={(url) => setIcon(url)} value={icon} />
                                                </div>
                                                <div>
                                                    <Label>Bottom Icon</Label>
                                                    <ImageUploader onChange={(url) => setBottomIcon(url)} value={bottomIcon} />
                                                </div>
                                                <div>
                                                    <Label>Title</Label>
                                                    <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Description</Label>
                                                    <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-36"/>
                                                </div>
                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditItem(item._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>
                                
                                    <MdDelete className="mt-1 cursor-pointer text-black" onClick={()=>handleDeleteItem(item._id)}/>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            </div>
        </div>
    );
}


