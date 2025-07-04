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
    introImageAltTag: string;
    sectionTwoImage: string;
    sectionTwoImageAltTag: string;
    missionDescription: string;
    visionDescription: string;
    valuesDescription: string;
    missionIcon: string;
    visionIcon: string;
    valuesIcon: string;
    missionAltTag: string;
    visionAltTag: string;
    valuesAltTag: string;
    banner: string;
    bannerAltTag: string;
    metaTitle: string;
    metaDescription: string;
}

interface WhyUs {
    _id: string;
    icon: string;
    title: string;
    description: string;
    bottomIcon: string;
    iconAltTag: string;
}

export default function About() {

    const { register, handleSubmit, setValue, watch, control } = useForm<AboutData>();
    const [icon, setIcon] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [bottomIcon, setBottomIcon] = useState<string>("");
    const [iconAltTag, setIconAltTag] = useState<string>("");
    const [whyUsList, setWhyUsList] = useState<WhyUs[]>([]);

    const handleFetchIntroSection = async () => {
        try {
            const response = await fetch("/api/admin/about/intro");
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    setValue("title", data.data.introTitle);
                    setValue("image", data.data.introImage);
                    setValue("introImageAltTag", data.data.introImageAltTag);
                    setValue("description", data.data.introDescription);
                    setValue("banner", data.data.banner);
                    setValue("bannerAltTag", data.data.bannerAltTag);
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
                  setValue("missionAltTag", data.data.mission.altTag);
                  setValue("visionAltTag", data.data.vision.altTag);
                  setValue("valuesAltTag", data.data.values.altTag);
                  setValue("sectionTwoImage", data.data.sectionTwoImage);
                  setValue("sectionTwoImageAltTag", data.data.sectionTwoImageAltTag);
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


    const handleFetchMeta = async () => {
        try {
            const response = await fetch("/api/admin/about/meta");
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.metaTitle);
                setValue("metaDescription", data.metaDescription);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching meta section", error);
        }
    }

    const handleAddItem = async () => {
        try {
            const response = await fetch("/api/admin/about/why-us", {
                method: "POST",
                body: JSON.stringify({ icon, title, description, iconAltTag }),
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
                body: JSON.stringify({ title, description, icon, iconAltTag }),
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
        handleFetchMeta();
    }, [])

    const submitIntroSection = async (data: AboutData) => {
        try {
          const formData = new FormData();
          formData.append("title", data.title);
          formData.append("description", data.description);
          formData.append("image", data.image);
          formData.append("introImageAltTag", data.introImageAltTag);
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
          formData.append("missionAltTag", data.missionAltTag);
          formData.append("visionAltTag", data.visionAltTag);
          formData.append("valuesAltTag", data.valuesAltTag);
          formData.append("secondSectionImage", data.sectionTwoImage);
          formData.append("sectionTwoImageAltTag", data.sectionTwoImageAltTag);

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

    const submitBanner = async (data: AboutData) => {
        try {
          const formData = new FormData();
          formData.append("banner", data.banner);
          formData.append("bannerAltTag", data.bannerAltTag);
          const response = await fetch("/api/admin/about/banner", {
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

      const submitMetaSection = async () => {
        try {
          const formData = new FormData();
          formData.append("metaTitle", watch("metaTitle"));
          formData.append("metaDescription", watch("metaDescription"));
          const response = await fetch("/api/admin/about/meta", {
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
        <div className="grid grid-cols-1 gap-5">

                        <div className="h-fit w-full p-5 shadow-md rounded-md mt-5 bg-white">
                            <div className="flex justify-between border-b-2 pb-2">
                                <Label className="text-sm font-bold">Meta Section</Label>
                                <Button onClick={submitMetaSection}>Save</Button>
                            </div>
                            <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                                <div className="flex flex-col gap-1">
                                    <Label>Meta title</Label>
                                    <Input type="text" {...register("metaTitle")} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label>Meta Description</Label>
                                    <Input type="text" {...register("metaDescription")} />
                                </div>
                            </div>
                        </div>
            
            <form className="h-full w-full p-5 shadow-md rounded-md mt-5 bg-white" onSubmit={handleSubmit(submitBanner)}>
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="">Banner</Label>
                    <Button type="submit">Save</Button>
                </div>
                <div className="mt-2 flex flex-col gap-4 h-fit">
                    <div>
                        <ImageUploader onChange={(url) => setValue("banner", url)} value={watch("banner")} />
                    </div>
                    <div>
                        <Label className="">Banner Image Alt Tag</Label>
                        <Input type="text" placeholder="Banner Image Alt Tag" {...register("bannerAltTag")} />
                    </div>
                </div>
            </form>


            <form className="h-full w-full p-5 shadow-md rounded-md mt-5 bg-white" onSubmit={handleSubmit(submitIntroSection)}>
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Intro Section</Label>
                    <Button type="submit">Save</Button>
                </div>
                <div className="mt-2 flex flex-col gap-2 h-fit">
                    <div className="flex flex-col gap-1">
                        <Label className="">Title</Label>
                        <Input type="text" placeholder="Title" {...register("title")} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Description</Label>
                        <Controller name="description" control={control} rules={{ required: "Content is required" }} render={({ field }) => {
                            return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                        }} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Image</Label>
                        <ImageUploader onChange={(url) => setValue("image", url)} value={watch("image")} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Image Alt Tag</Label>
                        <Input type="text" placeholder="Image Alt Tag" {...register("introImageAltTag")} />
                    </div>
                </div>
            </form>




            <div className="h-full w-full">
                
            <form className="h-fit w-full p-5 shadow-md rounded-md mt-5 bg-white flex flex-col gap-2" onSubmit={handleSubmit(submitSecondSection)}>
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Second Section</Label>
                    <Button type="submit">Save</Button>
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="">Image</Label>
                  <ImageUploader onChange={(url) => setValue("sectionTwoImage", url)} value={watch("sectionTwoImage")} />
                </div>
                <div className="flex flex-col gap-1">
                        <Label className="">Image Alt Tag</Label>
                        <Input type="text" placeholder="Image Alt Tag" {...register("sectionTwoImageAltTag")} />
                    </div>
                <div className="mt-2 grid grid-cols-3 gap-2 h-fit">
                  <div className="flex gap-2 flex-col border-gray-300 p-2 border-r">
                    <div className="flex justify-center items-center">
                        <Label className="">Mission</Label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Description</Label>
                        <Textarea placeholder="Description" {...register("missionDescription")} className="min-h-36"/>
                    </div>
                    <div className="flex flex-col gap-1">
                    <Label className="">Icon</Label>
                      <ImageUploader onChange={(url) => setValue("missionIcon", url)} value={watch("missionIcon")} isLogo/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Alt Tag</Label>
                        <Input type="text" placeholder="Alt Tag" {...register("missionAltTag")} />
                    </div>
                  </div>

                  <div className="flex gap-2 flex-col border-gray-300 p-2 border-r">
                  <div className="flex justify-center items-center">
                        <Label className="">Vision</Label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Description</Label>
                        <Textarea placeholder="Description" {...register("visionDescription")} className="min-h-36"/>
                    </div>
                    <div className="flex flex-col gap-1">
                    <Label className="">Icon</Label>
                      <ImageUploader onChange={(url) => setValue("visionIcon", url)} value={watch("visionIcon")} isLogo />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Alt Tag</Label>
                        <Input type="text" placeholder="Alt Tag" {...register("visionAltTag")} />
                    </div>
                  </div>

                  <div className="flex gap-2 flex-col border-gray-300 p-2">
                  <div className="flex justify-center items-center">
                        <Label className="">Values</Label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Description</Label>
                        <Textarea placeholder="Description" {...register("valuesDescription")} className="min-h-36"/>
                    </div>
                    <div className="flex flex-col gap-1">
                    <Label className="">Icon</Label>
                      <ImageUploader onChange={(url) => setValue("valuesIcon", url)} value={watch("valuesIcon")} isLogo />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Alt Tag</Label>
                        <Input type="text" placeholder="Alt Tag" {...register("valuesAltTag")} />
                    </div>
                  </div>
                </div>
            </form>

            <div className="h-fit w-full p-5 border-2 border-gray-300 rounded-md mt-5 bg-white">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Why Us</Label>
                    <Dialog>
                        <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => { setIcon(""); setTitle(""); setDescription(""); setIconAltTag("") }}>Add Item</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Item</DialogTitle>
                                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                    <div>
                                        <Label>Icon</Label>
                                        <ImageUploader onChange={(url) => setIcon(url)} value={icon} isLogo/>
                                    </div>
                                    <div>
                                        <Label>Alt Tag</Label>
                                        <Input type="text" placeholder="Alt Tag" value={iconAltTag} onChange={(e) => setIconAltTag(e.target.value)} />
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
                        <div key={index} className="relative flex  justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="flex gap-4 items-center">
                                <div className="bg-black p-2">
                                    <Image src={item.icon} alt={item.title} width={50} height={50} className="object-contain"/>
                                </div>
                                <div>
                                    <h3 className="text-[16px]">{item.title}</h3>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger className=" text-white px-2 py-1 rounded-md" onClick={() => { setTitle(item.title); setDescription(item.description); setIcon(item.icon); setBottomIcon(item.bottomIcon); setIconAltTag(item.iconAltTag); }}>
                                        <MdEdit className="text-black cursor-pointer"/>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Item</DialogTitle>
                                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                                <div>
                                                    <Label>Icon</Label>
                                                    <ImageUploader onChange={(url) => setIcon(url)} value={icon} isLogo/>
                                                </div>
                                                <div>
                                                    <Label>Alt Tag</Label>
                                                    <Input type="text" placeholder="Alt Tag" value={iconAltTag} onChange={(e) => setIconAltTag(e.target.value)} />
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


