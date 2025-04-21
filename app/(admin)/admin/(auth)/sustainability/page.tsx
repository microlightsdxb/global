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
import { BsImages } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


interface SustainabilityData {
    _id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    sectionTwoImage: string;
    secondSectionTitle: string;
    secondSectionDescription: string;
    goalsTitle:string;
    goalsDescription:string;
    outroTitle:string;
    outroDescription:string;
    metaTitle: string;
    metaDescription: string;
}

interface Items {
    _id: string;
    icon: string;
    iconAlt: string;
    title: string;
    description: string;
    bottomIcon: string;
    images:string[]
    image:string;
}


export default function Sustainability() {

    const { register, handleSubmit, setValue, watch, control } = useForm<SustainabilityData>();
    const [icon, setIcon] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [secondSectionItems, setSecondSectionItems] = useState<Items[]>([]);
    const [certificationList, setCertificationList] = useState<Items[]>();
    const [certificationTitle, setCertificationTitle] = useState("")
    const [certificationDescription, setCertificationDescription] = useState("")
    const [images,setImages] = useState<string[]>([])
    const [goalsList,setGoalsList] = useState<Items[]>([])
    const [goalTitle,setGoalTitle] = useState("")
    const [goalDescription,setGoalDescription] = useState("")
    const [goalImage,setGoalImage] = useState("")
    const [iconAlt,setIconAlt] = useState("")
    const [goalIconAlt, setGoalIconAlt] = useState("")


    const handleFetchIntroSection = async () => {
        try {
            const response = await fetch("/api/admin/sustainability/intro");
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    setValue("title", data.data.introTitle);
                    setValue("image", data.data.introImage);
                    setValue("imageAlt", data.data.introImageAlt);
                    setValue("description", data.data.introDescription);
                    setValue("metaTitle", data.data.metaTitle);
                    setValue("metaDescription", data.data.metaDescription);
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
            const response = await fetch("/api/admin/sustainability/second");
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    setValue("secondSectionTitle", data.data.sectionTwoTitle);
                    setValue("secondSectionDescription", data.data.sectionTwoDescription);
                    setSecondSectionItems(data.practices)
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching second section", error);
        }
    }



    const handleFetchCertifications = async () => {
        try {
            const response = await fetch("/api/admin/sustainability/certification");
            if (response.ok) {
                const data = await response.json();
                setCertificationList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching certifications", error);
        }
    }


    const handleFetchGoalSection = async () => {
        try {
            const response = await fetch("/api/admin/sustainability/goal");
            if (response.ok) {
                const data = await response.json();
                setValue("goalsTitle",data.data.title)
                setValue("goalsDescription",data.data.description)
                setGoalsList(data.data.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching goals", error);
        }
    }


    const handleAddItemSectionTwo = async () => {
        try {
            const response = await fetch("/api/admin/sustainability/second", {
                method: "PATCH",
                body: JSON.stringify({ icon, iconAlt, title, description }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchSecondSection()
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding item", error);
        }
    }

    const handleEditItemSecondSection = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/sustainability/second?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ title, description, icon, iconAlt }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchSecondSection();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing item", error);
        }
    }

    const handleDeleteItemSectionTwo = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/sustainability/second?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchSecondSection()
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting item", error);
        }
    }

    const handleAddCertificationItem = async () => {
        try {
            const response = await fetch("/api/admin/sustainability/certification", {
                method: "POST",
                body: JSON.stringify({ certificationTitle, certificationDescription }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCertifications()
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding item", error);
        }
    }

    const handleEditCertificationItem = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/sustainability/certification?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ certificationTitle, certificationDescription }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCertifications()
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding item", error);
        }
    }

    const handleDeleteCertificationItem = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/sustainability/certification?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCertifications()
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting item", error);
        }
    }

    const handleAddImages = async(id:string) => {
        try {
            const response = await fetch(`/api/admin/sustainability/certification/images?id=${id}`, {
                method: "POST",
                body:JSON.stringify({images})
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCertifications()
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting item", error);
        }
    }

    const handleAddGoal = async () =>{
        try {
            const response = await fetch(`/api/admin/sustainability/goal`, {
                method: "PATCH",
                body:JSON.stringify({goalTitle,goalDescription,goalImage,goalIconAlt})
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchGoalSection()
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding item", error);
        }
    }

    const handleEditGoalItem = async (id:string) =>{
        try {
            const response = await fetch(`/api/admin/sustainability/goal?id=${id}`, {
                method: "PATCH",
                body:JSON.stringify({goalTitle,goalDescription,goalImage,goalIconAlt})
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchGoalSection()
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error updating item", error);
        }
    }

    const handleDeleteGoalItem = async (id:string) =>{
        try {
            const response = await fetch(`/api/admin/sustainability/goal?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchGoalSection()
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting item", error);
        }
    }


    const handleFetchOutroSection = async () => {
        try {
            const response = await fetch("/api/admin/sustainability/outro");
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    setValue("outroTitle", data.data.outroTitle);
                    setValue("outroDescription", data.data.outroDescription);
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching outro section", error);
        }
    }


    useEffect(() => {
        handleFetchIntroSection();
        handleFetchSecondSection();
        handleFetchCertifications();
        handleFetchGoalSection();
        handleFetchOutroSection();
    }, [])

    const submitIntroSection = async (data: SustainabilityData) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("image", data.image);
            formData.append("imageAlt", data.imageAlt);
            const response = await fetch("/api/admin/sustainability/intro", {
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

    const submitSecondSection = async (data: SustainabilityData) => {
        try {
            const formData = new FormData();
            formData.append("secondSectionTitle", data.secondSectionTitle);
            formData.append("secondSectionDescription", data.secondSectionDescription);
            const response = await fetch("/api/admin/sustainability/second", {
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


    const submitGoalSection = async (data:SustainabilityData) =>{
        try {
            const formData = new FormData();
            formData.append("goalsTitle", data.goalsTitle);
            formData.append("goalsDescription", data.goalsDescription);
            const response = await fetch("/api/admin/sustainability/goal", {
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

    const submitOutroSection = async(data:SustainabilityData) =>{
        try {
            const formData = new FormData();
            formData.append("outroTitle", data.outroTitle);
            formData.append("outroDescription", data.outroDescription);
            const response = await fetch("/api/admin/sustainability/outro", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchOutroSection();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error saving details", error);
        }
    }

    const submitMetaSection = async() => {
        try {
            const response = await fetch("/api/admin/sustainability/meta", {
                method: "POST",
                body: JSON.stringify({
                    metaTitle: watch("metaTitle"),
                    metaDescription: watch("metaDescription")
                })
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


    return (
        <div className="h-screen grid grid-cols-1 gap-5">

            <div className="h-fit w-full p-2 border-2 border-gray-300 rounded-md mt-5">
                                        <div className="flex justify-between border-b-2 pb-2">
                                            <Label className="text-sm font-bold">Meta Section</Label>
                                            <Button onClick={submitMetaSection}>Save</Button>
                                        </div>
                                        <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                                            <div>
                                                <Label>Meta title</Label>
                                                <Input type="text" {...register("metaTitle")} />
                                            </div>
                                            <div>
                                                <Label>Meta Description</Label>
                                                <Input type="text" {...register("metaDescription")} />
                                            </div>
                                        </div>
                                    </div>

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
                        <ImageUploader onChange={(url) => setValue("image", url)} value={watch("image")}/>
                    </div>
                    <div>
                        <Label className="text-sm font-bold">Alt Tag</Label>
                        <Input type="text" placeholder="Alt Tag" {...register("imageAlt")} />
                    </div>
                </div>
            </form>


            <form className="h-fit w-full p-2 border-2 border-gray-300 rounded-md mt-5" onSubmit={handleSubmit(submitSecondSection)}>
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Second Section</Label>
                    <Button type="submit">Save</Button>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                    <div>
                        <Label className="text-sm font-bold">Title</Label>
                        <Input type="text" placeholder="Title" {...register("secondSectionTitle")} />
                    </div>
                    <div>
                        <Label className="text-sm font-bold">Description</Label>
                        <Textarea placeholder="Description" {...register("secondSectionDescription")} className="min-h-36" />
                    </div>

                    <div className="flex justify-end mt-5">
                        <Dialog>
                            <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => { setIcon(""); setTitle(""); setDescription(""); setIconAlt("") }}>Add Item</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Item</DialogTitle>
                                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                        <div>
                                            <Label>Icon</Label>
                                            <ImageUploader onChange={(url) => setIcon(url)} value={icon} />
                                        </div>
                                        <div>
                                            <Label>Alt Tag</Label>
                                            <Input type="text" placeholder="Alt Tag" value={iconAlt} onChange={(e) => setIconAlt(e.target.value)} />
                                        </div>
                                        <div>
                                            <Label>Title</Label>
                                            <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                        <div>
                                            <Label>Description</Label>
                                            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-36" />
                                        </div>
                                    </div>
                                </DialogHeader>
                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddItemSectionTwo}>Save</DialogClose>
                            </DialogContent>

                        </Dialog>
                    </div>

                    {secondSectionItems?.map((item, index) => (
                        <div key={index} className="relative flex  justify-between border p-1 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300 h-32">
                            <div className="flex gap-4 items-center h-full">
                                <div className="h-full">
                                    <Image src={item.icon} alt={item.title} width={100} height={100} className="object-cover h-full w-full" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold">{item.title}</h3>
                                </div>
                            </div>
                            <div className="absolute top-1 right-1 flex gap-2">
                                <Dialog>
                                    <DialogTrigger className=" text-white px-2 py-1 rounded-md" onClick={() => { setTitle(item.title); setDescription(item.description); setIcon(item.icon); setIconAlt(item.iconAlt) }}>
                                        <MdEdit className="text-black cursor-pointer" />
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
                                                    <Label>Alt Tag</Label>
                                                    <Input type="text" placeholder="Alt Tag" value={iconAlt} onChange={(e) => setIconAlt(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Title</Label>
                                                    <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Description</Label>
                                                    <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-36" />
                                                </div>
                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditItemSecondSection(item._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>

                                <MdDelete className="mt-1 cursor-pointer text-black" onClick={() => handleDeleteItemSectionTwo(item._id)} />

                            </div>
                        </div>
                    ))}
                </div>
            </form>


            <div className="h-fit w-full p-2 border-2 border-gray-300 rounded-md mt-5">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Certifications</Label>
                    <Dialog>
                        <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => { setCertificationTitle(""); setCertificationDescription(""); }}>Add Item</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Item</DialogTitle>
                                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                    <div>
                                        <Label>Title</Label>
                                        <Input type="text" placeholder="Title" value={certificationTitle} onChange={(e) => setCertificationTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <Textarea placeholder="Description" value={certificationDescription} onChange={(e) => setCertificationDescription(e.target.value)} className="min-h-36" />
                                    </div>
                                </div>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddCertificationItem}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2  h-fit">

                    {certificationList?.map((item, index) => (
                        <div key={index} className="relative flex  justify-between border p-3 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <h3 className="text-sm font-bold">{item.title}</h3>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center gap-5">
                                    <Dialog>
                                        <DialogTrigger className=" text-white rounded-md" onClick={() => { setCertificationTitle(item.title); setCertificationDescription(item.description); }}>

                                            <MdEdit className="text-black cursor-pointer" />

                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Item</DialogTitle>
                                                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                                    <div>
                                                        <Label>Title</Label>
                                                        <Input type="text" placeholder="Title" value={certificationTitle} onChange={(e) => setCertificationTitle(e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <Label>Description</Label>
                                                        <Textarea placeholder="Description" value={certificationDescription} onChange={(e) => setCertificationDescription(e.target.value)} className="min-h-36" />
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditCertificationItem(item._id)}>Save</DialogClose>
                                        </DialogContent>

                                    </Dialog>

                                    
                                    <Sheet>
                                        <SheetTrigger><BsImages className=" cursor-pointer text-black" onClick={()=>{setImages(item.images);}}/></SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle className="flex gap-2 items-center">Add Images<FaPlusCircle onClick={()=>{setImages([...images,""])}}/></SheetTitle>
                                                <div className="flex flex-col gap-3 h-[500px] overflow-y-auto p-1">
                                                    {images.map((_,index)=>(
                                                        <ImageUploader value={images[index]} onChange={(url)=>images[index]=url} removeIcon={images[index]==""} handleRemovePlaceHolder={()=>setImages(images.filter((_,itemIndex)=>index!==itemIndex))} key={index}/>
                                                    ))}
                                                </div>
                                            </SheetHeader>
                                            <SheetFooter className="mb-5">
                                                <SheetClose className="bg-black p-2 text-white" onClick={()=>handleAddImages(item._id)}>Save</SheetClose>
                                            </SheetFooter>
                                        </SheetContent>
                                    </Sheet>


                                    <MdDelete className=" cursor-pointer text-black" onClick={() => handleDeleteCertificationItem(item._id)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <form className="h-fit w-full p-2 border-2 border-gray-300 rounded-md mt-5" onSubmit={handleSubmit(submitGoalSection)}>
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Goals Section</Label>
                    <Button type="submit">Save</Button>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                    <div>
                        <Label className="text-sm font-bold">Title</Label>
                        <Input type="text" placeholder="Title" {...register("goalsTitle")} />
                    </div>
                    <div>
                        <Label className="text-sm font-bold">Description</Label>
                        <Textarea placeholder="Description" {...register("goalsDescription")} className="min-h-36" />
                    </div>

                    <div className="flex justify-end mt-5">
                        <Dialog>
                            <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => { setGoalImage(""); setGoalTitle(""); setGoalDescription(""); setGoalIconAlt("") }}>Add Item</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Item</DialogTitle>
                                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                        <div>
                                            <Label>Image</Label>
                                            <ImageUploader onChange={(url) => setGoalImage(url)} value={icon} />
                                        </div>
                                        <div>
                                            <Label>Alt Tag</Label>
                                            <Input type="text" placeholder="Alt Tag" value={goalIconAlt} onChange={(e) => setGoalIconAlt(e.target.value)} />
                                        </div>
                                        <div>
                                            <Label>Title</Label>
                                            <Input type="text" placeholder="Title" value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} />
                                        </div>
                                        <div>
                                            <Label>Description</Label>
                                            <Textarea placeholder="Description" value={goalDescription} onChange={(e) => setGoalDescription(e.target.value)} className="min-h-36" />
                                        </div>
                                    </div>
                                </DialogHeader>
                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddGoal}>Save</DialogClose>
                            </DialogContent>

                        </Dialog>
                    </div>

                    {goalsList.map((item, index) => (
                        <div key={index} className="relative flex  justify-between border p-1 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <Image src={item.image} alt={item.title} width={100} height={100} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold">{item.title}</h3>
                                </div>
                            </div>
                            <div className="absolute top-1 right-1 flex gap-2">
                                <Dialog>
                                    <DialogTrigger className=" text-white px-2 py-1 rounded-md" onClick={() => { setGoalTitle(item.title); setGoalDescription(item.description); setGoalImage(item.image); setGoalIconAlt(item.iconAlt) }}>

                                        <MdEdit className="text-black cursor-pointer" />

                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Item</DialogTitle>
                                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                                <div>
                                                    <Label>Icon</Label>
                                                    <ImageUploader onChange={(url) => setGoalImage(url)} value={goalImage} />
                                                </div>
                                                <div>
                                            <Label>Alt Tag</Label>
                                            <Input type="text" placeholder="Alt Tag" value={goalIconAlt} onChange={(e) => setGoalIconAlt(e.target.value)} />
                                        </div>
                                                <div>
                                                    <Label>Title</Label>
                                                    <Input type="text" placeholder="Title" value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Description</Label>
                                                    <Textarea placeholder="Description" value={goalDescription} onChange={(e) => setGoalDescription(e.target.value)} className="min-h-36" />
                                                </div>
                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditGoalItem(item._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>

                                <MdDelete className="mt-1 cursor-pointer text-black" onClick={() => handleDeleteGoalItem(item._id)} />

                            </div>
                        </div>
                    ))}
                </div>
            </form>


            <form className="h-fit w-full p-2 border-2 border-gray-300 rounded-md mt-5 " onSubmit={handleSubmit(submitOutroSection)}>
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Outro Section</Label>
                    <Button>Save</Button>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                    <div>
                        <Label className="text-sm font-bold ">Title</Label>
                        <Input type="text" placeholder="Title" {...register("outroTitle")} />
                    </div>
                    <div>
                        <Label className="text-sm font-bold">Description</Label>
                        <Textarea placeholder="Description" {...register("outroDescription")} className="min-h-36" />
                    </div>
                </div>
            </form>


        </div>
    );
}



