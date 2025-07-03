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

    const [name, setName] = useState<string>("");
    const [designation, setDesignation] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [imageAlt, setImageAlt] = useState<string>("");
    const [memberList, setMemberList] = useState<TeamMember[]>([]);
    const { register, handleSubmit, setValue, watch, control } = useForm<TeamMember>();
    const [metaTitle, setMetaTitle] = useState<string>("");
    const [metaDescription, setMetaDescription] = useState<string>("");

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

    const handleFetchMembers = async () => {
        try {
            const response = await fetch("/api/admin/team/member");
            if (response.ok) {
                const data = await response.json();
                setMemberList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching members", error);
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



    const handleAddMember = async () => {
        try {
            const response = await fetch("/api/admin/team/member", {
                method: "POST",
                body: JSON.stringify({ name, designation, image, imageAlt }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchMembers();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding member", error);
        }
    }

    const handleEditMember = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/team/member?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ name, designation, image, imageAlt }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchMembers();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing member", error);
        }
    }

    const handleDeleteMember = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/team/member?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchMembers();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting member", error);
        }
    }


    useEffect(() => {
        handleFetchMembers();
        handleFetchMdDetails();
        handleFetchMetaDetails();
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

    return (
        <div className="grid grid-cols-1 gap-5">

            <div className="h-fit w-full p-5 shadow-md border-gray-300 rounded-md mt-5 bg-white">
                                        <div className="flex justify-between border-b-2 pb-2">
                                            <Label className="text-sm font-bold">Meta Section</Label>
                                            <Button onClick={submitMetaSection}>Save</Button>
                                        </div>
                                        <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                                            <div>
                                                <Label>Meta title</Label>
                                                <Input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                                            </div>
                                            <div>
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
                    <div>
                        <Label className="text-sm">Name</Label>
                        <Input type="text" placeholder="Name" {...register("name")} />
                    </div>
                    <div>
                        <Label className="text-sm">Designation</Label>
                        <Input type="text" placeholder="Designation" {...register("designation")} />
                    </div>
                    <div>
                        <Label className="text-sm">Image</Label>
                        <ImageUploader onChange={(url) => setValue("image", url)} value={watch("image")} />
                    </div>
                    <div>
                        <Label className="text-sm">Alt Tag</Label>
                        <Input type="text" placeholder="Alt Tag" {...register("mdImageAlt")} />
                    </div>
                    <div>
                        <Label className="text-sm">Description</Label>
                        <Controller name="description" control={control} rules={{ required: "Content is required" }} render={({ field }) => {
                            return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                        }} />
                    </div>
                </div>
            </form>




            <div className="h-full w-full p-5 shadow-md border-gray-300 rounded-md bg-white">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Members</Label>
                    <Dialog>
                        <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => { setName(""); setDesignation(""); setImage(""); }}>Add Member</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Member</DialogTitle>
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
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddMember}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                    {memberList.map((member, index) => (
                        <div key={index} className="relative flex  justify-between border-b p-2 px-4 items-center shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <Image src={member.image} alt={member.name} width={100} height={100} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold">{member.name}</h3>
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
                </div>
            </div>
        </div>
    );
}

