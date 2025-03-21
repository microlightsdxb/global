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

interface BlogFormProps {
    title: string;
    content: string;
    category:string;
    image:string;
}


const BlogForm = ({ editMode }: { editMode?: boolean }) => {

    const router = useRouter();
    const { id } = useParams();

    const [categoryList, setCategoryList] = useState<{ name: string }[]>([]);

    const { register, handleSubmit, setValue, watch,control, formState: { errors } } = useForm<BlogFormProps>();

    const handleAddBlog = async (data: BlogFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/blog?id=${id}` : "/api/admin/blog", {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                router.push("/admin/blogs");
            }
        } catch (error) {
            console.log("Error in adding blog", error);
        }
    }

    const fetchBlogData = async () => {
        try {
            const response = await fetch(`/api/admin/blog?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setValue("title", data.data.title);
                setValue("content", data.data.content);
                setValue("category", data.data.category);
                setValue("image", data.data.image);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching blog data", error);
        }
    }



    const fetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/category");
            if (response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            }
        } catch (error) {
            console.log("Error in fetching category", error);
        }
    }

    // const fetchLocation = async () => {
    //     try {
    //         const response = await fetch("/api/admin/location");
    //         if (response.ok) {
    //             const data = await response.json();
    //             setLocationList(data.data);
    //         }
    //     } catch (error) {
    //         console.log("Error in fetching location", error);
    //     }
    // }

    useEffect(() => {
        fetchCategory().then(() => ((editMode) ? fetchBlogData() : null));
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <h1 className='text-lg font-bold'>{editMode ? "Edit Blog" : "Add Blog"}</h1>
            <form className='flex flex-col gap-5 border p-2 rounded-md' onSubmit={handleSubmit(handleAddBlog)}>
                
                    <div>
                        <Label className='pl-3'>Title</Label>
                        <Input type='text' placeholder='Title' {...register("title", { required: "Title is required" })} />
                        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                    <Label className='pl-3'>Category</Label>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryList.map((item, index) => (
                                        <SelectItem key={index} value={item.name}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}

                </div>
                

                <div>
                        <Label className='pl-3'>Image</Label>
                        <ImageUploader onChange={(url)=>setValue("image",url)} value={watch("image")} />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                </div>

                <div>
                    <Controller name="content" control={control} rules={{ required: "Content is required" }} render={({ field }) => {
                        return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                    }} />
                    {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
                </div>


                <div className='flex justify-center'>
                    <Button type='submit'>Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default BlogForm