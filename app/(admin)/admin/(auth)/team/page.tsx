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
    DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { IoPersonAddSharp } from "react-icons/io5";
import Link from "next/link";
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import DepartmentCard from "./[departmentId]/DepartmentCard";
import { TbReorder } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";

interface TeamMember {
    _id: string;
    name: string;
    designation: string;
    image: string;
    imageAlt: string;
    description: string;
    mdImageAlt: string;
}

export default function Team() {

    const { register, handleSubmit, setValue, watch, control } = useForm<TeamMember>();
    const [metaTitle, setMetaTitle] = useState<string>("");
    const [metaDescription, setMetaDescription] = useState<string>("");
    const [designationList, setDesignationList] = useState<{ _id: string, title: string }[]>([]);
    const [title, setTitle] = useState<string>("");
    const [reorderMode, setReorderMode] = useState(false);


    const handleFetchMdDetails = async () => {
        try {
            const response = await fetch("/api/admin/team/md");
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    setValue("name", data.data.mdName);
                    setValue("designation", data.data.mdDesignation);
                    setValue("image", data.data.mdImage);
                    setValue("description", data.data.mdDescription);
                    setValue("mdImageAlt", data.data.mdImageAlt);
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching industry", error);
        }
    }


    const handleFetchMetaDetails = async () => {
        try {
            const response = await fetch("/api/admin/team/meta");
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setMetaTitle(data.teamMeta.metaTitle);
                    setMetaDescription(data.teamMeta.metaDescription);
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching meta details", error);
        }
    }

    const handleFetchDepartments = async () => {
        try {
            const response = await fetch("/api/admin/team/department");
            if (response.ok) {
                const data = await response.json();
                setDesignationList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching designations", error);
        }
    }

    const handleAddDepartment = async () => {
        try {
            const response = await fetch("/api/admin/team/department", {
                method: "POST",
                body: JSON.stringify({ title }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchDepartments();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding member", error);
        }
    }

    const handleEditDepartment = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/team/department?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ title }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchDepartments();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing member", error);
        }
    }

    const handleDeleteDepartment = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/team/department?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchDepartments();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting member", error);
        }
    }


    useEffect(() => {
        handleFetchMdDetails();
        handleFetchMetaDetails();
        handleFetchDepartments();
    }, [])

    const onSubmit = async (data: TeamMember) => {
        try {
            const response = await fetch("/api/admin/team/md", {
                method: "POST",
                body: JSON.stringify(data),
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

    const submitMetaSection = async () => {
        try {
            const response = await fetch("/api/admin/team/meta", {
                method: "POST",
                body: JSON.stringify({ metaTitle, metaDescription }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error saving meta details", error);
        }
    }

    const getTaskPos = (id: number | string) => designationList.findIndex((item:{_id:string})=>( item._id == id))
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
      
        if (!over || active.id === over.id) return;
      
        setDesignationList((designationList: { _id: string; title: string}[]) => {
          const originalPos = getTaskPos(active.id);
          const newPos = getTaskPos(over.id);
          return arrayMove(designationList, originalPos, newPos);
        });
      };


      const confirmPosition = async() => {
        console.log("first")
        setReorderMode(!reorderMode);

        const formData = new FormData()
        console.log(designationList)
        formData.append('designationList',JSON.stringify(designationList))
        const response = await fetch(`/api/admin/team/department/reorder`,{
            method:"POST",
            body:formData
        })
        if(response.ok){
            const data = await response.json()
            if(data.success){
                alert(data.message)
            }else{
                alert(data.message)
            }
        }
    };

    return (
        <div className="grid grid-cols-1 gap-5">

            <div className="h-fit w-full p-5 shadow-md border-gray-300 rounded-md mt-5 bg-white">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Meta Section</Label>
                    <Button onClick={submitMetaSection}>Save</Button>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                    <div className="flex flex-col gap-1">
                        <Label>Meta title</Label>
                        <Input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Meta Description</Label>
                        <Input type="text" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                    </div>
                </div>
            </div>

            <form className="h-full w-full p-5 shadow-md border-gray-300 rounded-md bg-white" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">MD Section</Label>
                    <Button type="submit">Save</Button>
                </div>
                <div className="mt-2 flex flex-col gap-2 h-fit">
                    <div className="flex flex-col gap-1">
                        <Label className="">Name</Label>
                        <Input type="text" placeholder="Name" {...register("name")} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Designation</Label>
                        <Input type="text" placeholder="Designation" {...register("designation")} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Image</Label>
                        <ImageUploader onChange={(url) => setValue("image", url)} value={watch("image")} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Alt Tag</Label>
                        <Input type="text" placeholder="Alt Tag" {...register("mdImageAlt")} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="">Description</Label>
                        <Controller name="description" control={control} rules={{ required: "Content is required" }} render={({ field }) => {
                            return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                        }} />
                    </div>
                </div>
            </form>




            <div className="h-full w-full p-5 shadow-md border-gray-300 rounded-md bg-white">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Departments</Label>
                    <div className="flex gap-2">
                    <Button type="button" onClick={() => reorderMode ? confirmPosition() : setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>
                    <Dialog>
                        <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => { setTitle(""); }} disabled={reorderMode}>Add Department</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Department</DialogTitle>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <Label>Title</Label>
                                        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                </div>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddDepartment}>Save</DialogClose>
                        </DialogContent>
                    </Dialog>
                    </div>
                </div>



                <div className="mt-2 flex flex-col gap-2 overflow-y-auto h-[60vh]">

                    {reorderMode &&

                        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                            <SortableContext items={designationList.map((member) => member._id)} strategy={verticalListSortingStrategy}>
                                {designationList?.map((item, index) => (
                                    <DepartmentCard key={index} item={item} id={item._id}/>
                                ))}
                            </SortableContext>
                        </DndContext>

                    }

                    {!reorderMode && designationList?.map((item) => (
                        <div className="flex justify-between border p-3 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                            <div className="text-[16px]">
                                {item.title}
                            </div>
                            <div className="flex gap-10">
                                <Dialog>
                                    <DialogTrigger onClick={() => { setTitle(item.title); }}><MdEdit /></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Department</DialogTitle>
                                            <DialogDescription>
                                                <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditDepartment(item._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>



                                <Link href={`/admin/team/${item._id}`}><IoPersonAddSharp /></Link>


                                <Dialog>
                                    <DialogTrigger><MdDelete /></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you sure?</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex gap-2">
                                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteDepartment(item._id)}>Yes</DialogClose>
                                        </div>

                                    </DialogContent>

                                </Dialog>

                            </div>
                        </div>
                    ))}

                </div>

                {/* <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                    {memberList.map((member, index) => (
                        <div key={index} className="relative flex  justify-between border-b p-2 px-4 items-center shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <Image src={member.image} alt={member.name} width={100} height={100} />
                                </div>
                                <div>
                                    <h3 className="text-[16px]">{member.name}</h3>
                                </div>
                            </div>
                            <div className=" flex gap-2">
                                <Dialog>
                                    <DialogTrigger className=" text-white px-2 py-1 rounded-md" onClick={() => { setName(member.name); setDesignation(member.designation); setImage(member.image); setImageAlt(member.imageAlt) }}>

                                            <MdEdit className="text-black cursor-pointer"/>

                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Member</DialogTitle>
                                            <div className="flex flex-col gap-4">
                                                <div>
                                                    <Label>Name</Label>
                                                    <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Designation</Label>
                                                    <Input type="text" placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Image</Label>
                                                    <ImageUploader onChange={(url) => setImage(url)} value={image} />
                                                </div>
                                                <div>
                                                    <Label>Alt Tag</Label>
                                                    <Input type="text" placeholder="Alt Tag" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
                                                </div>
                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditMember(member._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>
                                
                                    <MdDelete className="mt-1 cursor-pointer text-black" onClick={()=>handleDeleteMember(member._id)}/>
                                
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}

