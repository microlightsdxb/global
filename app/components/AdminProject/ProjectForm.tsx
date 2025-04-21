"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { useForm, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { ImageUploader } from '@/components/ui/image-uploader'
import Image from 'next/image';

interface ProjectFormProps {
    name: string;
    client: string;
    industry: string;
    scope: string;
    location: string;
    description: string;
    images: string[];
    thumbnail: string;
    thumbnailAlt: string;
    metaTitle: string;
    metaDescription: string;
}

const ProjectForm = ({ editMode }: { editMode?: boolean }) => {

    const router = useRouter();
    const { id } = useParams();

    const [industryList, setIndustryList] = useState<{ name: string }[]>([]);
    const [locationList, setLocationList] = useState<{ name: string }[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const { register, handleSubmit, setValue, watch,control, formState: { errors } } = useForm<ProjectFormProps>();

    const handleAddProject = async (data: ProjectFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/project?id=${id}` : "/api/admin/project", {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                router.push("/admin/projects");
            }
        } catch (error) {
            console.log("Error in adding project", error);
        }
    }

    const fetchProjectData = async () => {
        try {
            const response = await fetch(`/api/admin/project?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setValue("name", data.data.name);
                setValue("client", data.data.client);
                setValue("industry", data.data.industry);
                setValue("scope", data.data.scope);
                setValue("thumbnail", data.data.thumbnail);
                setValue("thumbnailAlt", data.data.thumbnailAlt);
                setValue("images", data.data.images);
                setImageUrls(data.data.images);
                setValue("location", data.data.location);
                setValue("description", data.data.description);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching project data", error);
        }
    }



    const fetchIndustry = async () => {
        try {
            const response = await fetch("/api/admin/industry");
            if (response.ok) {
                const data = await response.json();
                setIndustryList(data.data);
            }
        } catch (error) {
            console.log("Error in fetching industry", error);
        }
    }

    const fetchLocation = async () => {
        try {
            const response = await fetch("/api/admin/location");
            if (response.ok) {
                const data = await response.json();
                setLocationList(data.data);
            }
        } catch (error) {
            console.log("Error in fetching location", error);
        }
    }

    useEffect(() => {
        fetchIndustry().then(() => fetchLocation().then(() => ((editMode) ? fetchProjectData() : null)));
    }, []);

    const handleImageUpload = async (uploadedUrl: string) => {
        setImageUrls((prev) => [...prev, uploadedUrl]);
        setValue("images", [...imageUrls, uploadedUrl]);
      };

      const handleRemoveImage = (indexToRemove: number) => {
        setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
        setValue(
          "images",
          imageUrls.filter((_, index) => index !== indexToRemove)
        );
      };


    return (
        <div className='flex flex-col gap-5'>
            <h1 className='text-lg font-bold'>{editMode ? "Edit Project" : "Add Project"}</h1>
            <form className='flex flex-col gap-5 border p-2 rounded-md' onSubmit={handleSubmit(handleAddProject)}>
                <div className='grid grid-cols-2 gap-2'>
                    <div>
                        <Label className='pl-3 font-bold'>Name</Label>
                        <Input type='text' placeholder='Project Name' {...register("name", { required: "Name is required" })} />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div>
                        <Label className='pl-3 font-bold'>Thumbnail</Label>
                        <ImageUploader onChange={(url)=>setValue("thumbnail",url)} value={watch("thumbnail")} />
                        {errors.thumbnail && <p className='text-red-500'>{errors.thumbnail.message}</p>}
                        </div>
                        <div>
                        <Label className='pl-3 font-bold'>Alt Tag</Label>
                        <Input type='text' placeholder='Alt Tag' {...register("thumbnailAlt")} />
                    </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Client</Label>
                    <Input type='text' placeholder='Client Name' {...register("client", { required: "Client is required" })} />
                    {errors.client && <p className='text-red-500'>{errors.client.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Industry</Label>
                    <Controller
                        name="industry"
                        control={control}
                        rules={{ required: "Industry is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    {industryList.map((item, index) => (
                                        <SelectItem key={index} value={item.name}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.industry && <p className="text-red-500">{errors.industry.message}</p>}

                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Scope</Label>
                    <Input type='text' placeholder='Scope' {...register("scope", { required: "Scope is required" })} />
                    {errors.scope && <p className='text-red-500'>{errors.scope.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Location</Label>
                    <Controller
                        name="location"
                        control={control}
                        rules={{ required: "Location is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locationList.map((item, index) => (
                                        <SelectItem key={index} value={item.name}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                </div>
                <div>
                <Label className='pl-3 font-bold'>Description</Label>
                    <Controller name="description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                        return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                    }} />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                </div>

                <div>
                    <Label className="block text-sm font-bold text-gray-700">Gallery</Label>
                    <div className="mt-2">
                        <ImageUploader onChange={handleImageUpload} deleteAfterUpload={true} />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {imageUrls.map((url, index) => (
                            <div key={index} className="relative h-40">
                                <Image
                                    src={url}
                                    alt={`Uploaded image ${index + 1}`}
                                    className="h-full w-full object-cover rounded-lg"
                                    width={100}
                                    height={100}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Title</Label>
                    <Input type='text' placeholder='Meta Title' {...register("metaTitle", { required: "Meta Title is required" })} />
                    {errors.metaTitle && <p className='text-red-500'>{errors.metaTitle.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Description</Label>
                    <Input type='text' placeholder='Meta Description' {...register("metaDescription", { required: "Meta Description is required" })} />
                    {errors.metaDescription && <p className='text-red-500'>{errors.metaDescription.message}</p>}
                </div>

                <div className='flex justify-center'>
                    <Button type='submit'>Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default ProjectForm