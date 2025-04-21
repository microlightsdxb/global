"use client"

import { ImageUploader } from '@/components/ui/image-uploader'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"



import { useParams, useRouter } from 'next/navigation';

import { MdDelete, MdEdit } from 'react-icons/md'
import { Textarea } from '@/components/ui/textarea'

interface ServiceFormProps {
    name: string;
    type: string;
    pageBanner: string;
    bannerAlt: string;
    pageHeading: string;
    introTitle: string;
    introDescription: string;
    introImage: string;
    introImageAlt: string;
    itemTitle: string;
    itemDescription: string;
    itemImage: string;
    itemAnimImage: string;
    itemImageAlt: string;
    items: { title: string, description: string, image: string ,animImage:string, imageAlt: string }[];
    metaTitle: string;
    metaDescription: string;
}

const ServiceForm = () => {
    const router = useRouter();
    const { id } = useParams();

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<ServiceFormProps>();
    const [items, setItems] = useState<{ title: string, description: string, image: string,animImage:string, imageAlt: string }[]>([]);

    const handleFetchService = async () => {
        try {
            const response = await fetch(`/api/admin/service/item?id=${id}`)
            if (response.ok) {
                const data = await response.json();
                setValue("name", data.data.name)
                setValue("pageHeading", data.data.pageHeading)
                setValue("pageBanner", data.data.pageBanner)
                setValue("bannerAlt", data.data.bannerAlt)
                setValue("introTitle", data.data.introTitle)
                setValue("introDescription", data.data.introDescription)
                setValue("introImage", data.data.introImage)
                setValue("introImageAlt", data.data.introImageAlt)
                setValue("type", data.data.method.name)
                setItems(data.data.method.items)
                setValue("items", data.data.method.items)
                setValue("metaTitle", data.data.metaTitle)
                setValue("metaDescription", data.data.metaDescription)
            } else {
                console.log("Error in fetching service")
            }
        } catch (error) {
            console.log("Error in fetching service", error)
        }
    }



    const handleAddItem = async () => {
        const newItem = {
            title: watch("itemTitle"),
            description: watch("itemDescription"),
            image: watch("itemImage"),
            animImage: watch("itemAnimImage"),
            imageAlt: watch("itemImageAlt"),
        };
    
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        setValue("items", updatedItems);
    
        // Clear input fields
        setValue("itemTitle", "");
        setValue("itemDescription", "");
        setValue("itemImage", "");
    };

    const handleEditItem = async (index: number) => {
        const updatedItems = [...items];
        updatedItems[index] = {
            title: watch("itemTitle"),
            description: watch("itemDescription"),
            image: watch("itemImage"),
            animImage: watch("itemAnimImage"),
            imageAlt: watch("itemImageAlt"),
        };
        setItems(updatedItems);
        setValue("items", updatedItems);
        setValue("itemTitle", "");
        setValue("itemDescription", "");
        setValue("itemImage", "");
        setValue("itemAnimImage", "");
    };

    const handleDeleteItem = async (index: number) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
        setValue("items", updatedItems);
    };


    const onSubmit = async (data: ServiceFormProps) => {
        try {
            const response = await fetch("/api/admin/service/item?id=" + id, {
                method: "PATCH",
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const data = await response.json();
                alert(data.message)
                router.push("/admin/services")
            } else {
                const data = await response.json();
                alert(data.message)
            }
        } catch (error) {
            console.log("Error in editing service", error)
        }
    }


    useEffect(() => {
        handleFetchService()
    }, [])



    return (
        <div className='flex flex-col gap-5'>
            <h1 className='text-lg font-bold'>{"Edit Service"}</h1>
            <form className='flex flex-col gap-5 p-2 rounded-md' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 gap-2 border-2 border-dashed p-2'>
                    <div>
                        <Label className='pl-3 font-bold'>Page Banner</Label>
                        <ImageUploader onChange={(url) => setValue("pageBanner", url)} value={watch("pageBanner")} />
                        {errors.pageBanner && <p className='text-red-500'>{errors.pageBanner.message}</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                            <Label className='pl-3 font-bold'>Banner Alt</Label>
                            <Input type='text' placeholder='Alt' {...register("bannerAlt")} />
                        </div>

                </div>
                <div className='flex flex-col gap-5'>
                    <Label className='font-bold'>Intro Section</Label>

                    <div className='border-2 border-dashed p-2 flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <Label className='pl-3 font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("introTitle", { required: "Title is required" })} />
                            {errors.introTitle && <p className='text-red-500'>{errors.introTitle.message}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='pl-3 font-bold'>Description</Label>
                            <Textarea placeholder='Description' {...register("introDescription", { required: "Description is required" })} />
                            {errors.introDescription && <p className='text-red-500'>{errors.introDescription.message}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='pl-3 font-bold'>Image</Label>
                            <ImageUploader onChange={(url) => setValue("introImage", url)} value={watch("introImage")} />
                            {errors.introImage && <p className='text-red-500'>{errors.introImage.message}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='pl-3 font-bold'>Alt Tag</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("introImageAlt")} />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Display Item Type</Label>
                    <Controller
                        name="type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select onValueChange={(value)=>{field.onChange(value)}} value={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="icon">With icon</SelectItem>
                                    <SelectItem value="image">With image</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                </div>

                <div className='flex flex-col gap-5 p-3 border-2 border-dashed rounded-md'>
                    <div className='flex justify-between'>
                        <h1 className='text-md font-bold'>Items</h1>
                        <Dialog>
                            <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>{setValue("itemTitle", "");setValue("itemDescription", "");setValue("itemImage", "");setValue("itemAnimImage", "");setValue("itemImageAlt", "")}}>Add Item</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Item</DialogTitle>
                                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                        <div>
                                            <Label>Title</Label>
                                            <Input type="text" placeholder="Title" {...register("itemTitle")} />
                                        </div>
                                        <div>
                                            <Label>Description</Label>
                                            <Input type="text" placeholder="Description" {...register("itemDescription")} />
                                        </div>
                                        <div>
                                            <Label>Image</Label>
                                            <ImageUploader onChange={(url) => setValue("itemImage", url)} value={watch("itemImage")} />
                                        </div>
                                        <div>
                                            <Label>Image Alt</Label>
                                            <Input type="text" placeholder="Image Alt" {...register("itemImageAlt")} />
                                        </div>
                                        <div>
                                            <Label>Anim Image</Label>
                                            <ImageUploader onChange={(url) => setValue("itemAnimImage", url)} value={watch("itemAnimImage")} />
                                        </div>
                                    </div>
                                </DialogHeader>
                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddItem}>Save</DialogClose>
                            </DialogContent>

                        </Dialog>
                    </div>
                    <div className='flex flex-col gap-2 overflow-y-auto'>
                        {items.map((item, index) => (
                            <div key={index} className='flex justify-between border p-4 rounded-md items-center shadow-md hover:shadow-lg transition-all duration-300'>
                                <div className='flex gap-5 items-center h-full'>
                                    <Image src={item.image} width={100} height={100} alt='image' />
                                </div>
                                <div className='flex gap-5 items-center h-full'>
                                    <div>{item.title}</div>
                                </div>
                                <div className='flex gap-5'>

                                    <Dialog>
                                <DialogTrigger onClick={() => { setValue("itemTitle", item.title); setValue("itemDescription", item.description); setValue("itemImage", item.image); setValue("itemAnimImage", item.animImage); setValue("itemImageAlt", item.imageAlt) }}><MdEdit /></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Item</DialogTitle>
                                        <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                        <div>
                                            <Label>Title</Label>
                                            <Input type="text" placeholder="Title" {...register("itemTitle")} />
                                        </div>
                                        <div>
                                            <Label>Description</Label>
                                            <Input type="text" placeholder="Description" {...register("itemDescription")} />
                                        </div>
                                        <div>
                                            <Label>Image</Label>
                                            <ImageUploader onChange={(url) => setValue("itemImage", url)} value={watch("itemImage")} />
                                        </div>
                                        <div>
                                            <Label>Image Alt</Label>
                                            <Input type="text" placeholder="Image Alt" {...register("itemImageAlt")} />
                                        </div>
                                        <div>
                                            <Label>Anim Image</Label>
                                            <ImageUploader onChange={(url) => setValue("itemAnimImage", url)} value={watch("itemAnimImage")} />
                                        </div>
                                    </div>
                                    </DialogHeader>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditItem(index)}>Save</DialogClose>
                                </DialogContent>

                            </Dialog>
                                    <MdDelete onClick={()=>handleDeleteItem(index)}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Title</Label>
                    <Input type='text' placeholder='Meta Title' {...register("metaTitle")} />
                    {errors.metaTitle && <p className='text-red-500'>{errors.metaTitle.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Description</Label>
                    <Textarea placeholder='Meta Description' {...register("metaDescription")} />
                    {errors.metaDescription && <p className='text-red-500'>{errors.metaDescription.message}</p>}
                </div>
                
                <div className='flex justify-center'>
                    <Button type='submit'>Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default ServiceForm