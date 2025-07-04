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
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { Textarea } from "@/components/ui/textarea";
import { RiDeleteBinLine } from "react-icons/ri";

interface AboutData {
    _id: string;
    aboutTitle: string;
    aboutDescription: string;
    aboutImage: string;
    years: number;
    projects: number;
    clients: number;
    aboutImageAltTag: string;
    industries: {
        title: string;
        items: {
            title: string;
            logo: string;
            logoAlt:string;
            image:string;
            imageAlt:string;
        }[]
    };
}




export default function AdminHome() {
    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<AboutData>();
    const [image, setImage] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [subTitle, setSubTitle] = useState<string>("");
    const [banners, setBanners] = useState<{ _id: string; title: string; subTitle: string; image: string; bannerAltTag: string }[]>([]);
    const [process, setProcess] = useState<{ _id: string; title: string }[]>([])
    const [processTitle, setProcessTitle] = useState<string>("");
    const [testimonials, setTestimonials] = useState<{ _id: string; name: string; company: string; image: string; content: string; testimonialImageAltTag: string }[]>([]);
    const [testimonialName, setTestimonialName] = useState<string>("");
    const [testimonialCompany, setTestimonialCompany] = useState<string>("");
    const [testimonialImage, setTestimonialImage] = useState<string>("");
    const [testimonialContent, setTestimonialContent] = useState<string>("");
    const [metaTitle, setMetaTitle] = useState<string>("");
    const [metaDescription, setMetaDescription] = useState<string>("");
    const [bannerAltTag, setBannerAltTag] = useState<string>("");
    const [testimonialImageAltTag, setTestimonialImageAltTag] = useState<string>("");


    const handleFetchAboutSection = async () => {
        try {
            const response = await fetch("/api/admin/home/about");
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    setValue("aboutTitle", data.data.aboutTitle);
                    setValue("aboutImage", data.data.aboutImage);
                    setValue("aboutDescription", data.data.aboutDescription);
                    setValue("years", data.data.years);
                    setValue("projects", data.data.projects);
                    setValue("clients", data.data.clients);
                    setValue("aboutImageAltTag",data.data.aboutImageAltTag)
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching about section", error);
        }
    }

    const handleFetchIndustriesSection = async () => {
        try {
            const response = await fetch("/api/admin/home/industries");
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    console.log(data.data)
                    setValue("industries.title", data.data.industries.title);
                    setValue("industries.items", data.data.industries.items);
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching industries section", error);
        }
    }



    const handleFetchBanners = async () => {
        try {
            const response = await fetch("/api/admin/home/banner");
            if (response.ok) {
                const data = await response.json();
                setBanners(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching banners", error);
        }
    }

    const handleFetchProcess = async () => {
        try {
            const response = await fetch("/api/admin/home/process");
            if (response.ok) {
                const data = await response.json();
                setProcess(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching process", error);
        }
    }

    const handleFetchMeta = async () => {
        try {
            const response = await fetch("/api/admin/home/meta");
            if (response.ok) {
                const data = await response.json();
                setMetaTitle(data.metaTitle);
                setMetaDescription(data.metaDescription);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching meta section", error);
        }
    }

    const handleAddBanner = async () => {
        try {
            const response = await fetch("/api/admin/home/banner", {
                method: "POST",
                body: JSON.stringify({ title, subTitle, image, bannerAltTag }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchBanners();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding banner", error);
        }
    }

    const handleAddProcess = async () => {
        try {
            const response = await fetch("/api/admin/home/process", {
                method: "POST",
                body: JSON.stringify({ title: processTitle }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchProcess();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding process", error);
        }
    }

    const handleAddTestimonial = async () => {
        try {
            const response = await fetch("/api/admin/home/testimonial", {
                method: "POST",
                body: JSON.stringify({ name: testimonialName, company: testimonialCompany, image: testimonialImage, content: testimonialContent, testimonialImageAltTag }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchTestimonials();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding testimonial", error);
        }
    }

    const handleEditBanner = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/home/banner?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ title, subTitle, image, bannerAltTag }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchBanners();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing banner", error);
        }
    }

    const handleEditProcess = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/home/process?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ title: processTitle }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchProcess();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing process", error);
        }
    }

    const handleEditTestimonial = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/home/testimonial?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ name: testimonialName, company: testimonialCompany, image: testimonialImage, content: testimonialContent, testimonialImageAltTag }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchTestimonials();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing testimonial", error);
        }
    }

    const handleDeleteBanner = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/home/banner?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message)
                handleFetchBanners();
            } else {
                const data = await response.json();
                alert(data.message)
            }
        } catch (error) {
            console.log("Error deleting banner", error)
        }
    }

    const handleDeleteProcess = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/home/process?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message)
                handleFetchProcess();
            } else {
                const data = await response.json();
                alert(data.message)
            }
        } catch (error) {
            console.log("Error deleting process", error)
        }
    }

    const handleDeleteTestimonial = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/home/testimonial?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message)
                handleFetchTestimonials();
            } else {
                const data = await response.json();
                alert(data.message)
            }
        } catch (error) {
            console.log("Error deleting testimonial", error)
        }
    }

    const handleFetchTestimonials = async () => {
        try {
            const response = await fetch("/api/admin/home/testimonial");
            if (response.ok) {
                const data = await response.json();
                setTestimonials(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching testimonials", error);
        }
    };

    const { fields: industriesFields, append: industriesAppend, remove: industriesRemove } = useFieldArray({
        control,
        name: "industries.items"
    });

    useEffect(() => {
        handleFetchAboutSection();
        handleFetchBanners();
        handleFetchProcess();
        handleFetchTestimonials();
        handleFetchMeta();
        handleFetchIndustriesSection();
    }, [])

    const submitAboutSection = async (data: AboutData) => {
        try {
            const formData = new FormData();
            formData.append("title", data.aboutTitle);
            formData.append("description", data.aboutDescription);
            formData.append("image", data.aboutImage);
            formData.append("years", data.years.toString());
            formData.append("projects", data.projects.toString());
            formData.append("clients", data.clients.toString());
            formData.append("aboutImageAltTag", data.aboutImageAltTag);
            const response = await fetch("/api/admin/home/about", {
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

    const submitMetaSection = async () => {
        try {
            const response = await fetch("/api/admin/home/meta", {
                method: "POST",
                body: JSON.stringify({ title: metaTitle, description: metaDescription }),
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

    const submitIndustriesSection = async (data: AboutData) => {
        try {
            console.log(data.industries);
            const response = await fetch("/api/admin/home/industries", {
                method: "POST",
                body: JSON.stringify({industries:data.industries.items,title:data.industries.title}),
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
        <div className="grid grid-cols-1 gap-5">

            <div className="h-fit w-full p-5 shadow-md border-gray-300 rounded-md mt-5 bg-white">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Meta Section</Label>
                    <Button onClick={submitMetaSection}>Save</Button>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                    <div className="flex flex-col gap-1">
                        <Label className="">Meta title</Label>
                        <Input type="text" className="text-[16px]" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Meta Description</Label>
                        <Input type="text" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="h-fit w-full p-5 shadow-md border-gray-300 rounded-md mt-5 bg-white">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Banners</Label>
                    <Dialog>
                        <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => { setImage(""); setTitle(""); setSubTitle(""); setBannerAltTag("") }}>Add Item</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Item</DialogTitle>
                                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                    <div>
                                        <Label>Image</Label>
                                        <ImageUploader onChange={(url) => setImage(url)} value={image} />
                                    </div>
                                    <div>
                                        <Label>Alt Tag</Label>
                                        <Input type="text" placeholder="Alt Tag" value={bannerAltTag} onChange={(e) => setBannerAltTag(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Title</Label>
                                        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Sub Title</Label>
                                        <Input type="text" placeholder="Sub Title" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} />
                                    </div>
                                </div>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddBanner}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                    {banners.map((item, index) => (
                        <div key={index} className="relative flex  justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <Image src={item.image} alt={item.title} width={100} height={100} />
                                </div>
                                <div>
                                    <h3 className="text-[16px]">{item.title}</h3>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger className=" text-white px-2 py-1 rounded-md" onClick={() => { setTitle(item.title); setSubTitle(item.subTitle); setImage(item.image); setBannerAltTag(item.bannerAltTag) }}>
                                        <MdEdit className="text-black cursor-pointer" />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Item</DialogTitle>
                                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                                <div>
                                                    <Label>Image</Label>
                                                    <ImageUploader onChange={(url) => setImage(url)} value={image} />
                                                </div>

                                                <div>
                                                    <Label>Alt Tag</Label>
                                                    <Input type="text" placeholder="Alt Tag" value={bannerAltTag} onChange={(e) => setBannerAltTag(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Title</Label>
                                                    <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Sub Title</Label>
                                                    <Input type="text" placeholder="SubTitle" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} />
                                                </div>
                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditBanner(item._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>

                                <MdDelete className="mt-1 cursor-pointer text-black" onClick={() => handleDeleteBanner(item._id)} />

                            </div>
                        </div>
                    ))}
                </div>
            </div>

<form onSubmit={handleSubmit(submitIndustriesSection)} className='p-5 shadow-md border-gray-300 rounded-md bg-white'>
                <div className="flex justify-between border-b-2 pb-2 mb-5">
                    <Label className="text-sm font-bold">Industries Section</Label>
                    <Button type="submit">Save</Button>
                </div>
                <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className=''>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`industries.title`)} />
                                </div>
                            </div>
                            <div>
                    <Label className=''>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5 mt-2'>


                    {industriesFields.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => industriesRemove(index)} className='cursor-pointer text-red-600' />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className=''>Image</Label>
                                    <Controller
                                        name={`industries.items.${index}.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.industries?.items?.[index]?.image && <p className='text-red-500'>{errors.industries?.items?.[index]?.image.message}</p>}
                                    <div className='flex flex-col gap-2'>
                                    <Label className=''>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`industries.items.${index}.imageAlt`)} />
                                </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className=''>Logo</Label>
                                    <Controller
                                        name={`industries.items.${index}.logo`}
                                        control={control}
                                        rules={{ required: "Logo is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                                isLogo
                                            />
                                        )}
                                    />
                                    {errors.industries?.items?.[index]?.logo && <p className='text-red-500'>{errors.industries?.items?.[index]?.logo.message}</p>}
                                    <div className='flex flex-col gap-2'>
                                    <Label className=''>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`industries.items.${index}.logoAlt`)} />
                                </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className=''>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`industries.items.${index}.title`)} />
                                </div>
                                </div>
                            </div>

                        </div>
                    ))}

                   

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' className="cursor-pointer" onClick={() => industriesAppend({ image: "", imageAlt: "", title: "",logo:"",logoAlt:"" })}>Add Item</Button>
                    </div>
                </div>

                
                </div>
                </form>


            <form className="h-full w-full p-5 shadow-md border-gray-300 rounded-md bg-white" onSubmit={handleSubmit(submitAboutSection)}>
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">About Section</Label>
                    <Button type="submit">Save</Button>
                </div>
                <div className="mt-2 flex flex-col gap-2 h-fit">
                    <div className='flex flex-col gap-1'>
                        <Label className="">Title</Label>
                        <Input type="text" placeholder="Title" {...register("aboutTitle")} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label className="">Description</Label>
                        <Controller name="aboutDescription" control={control} rules={{ required: "Content is required" }} render={({ field }) => {
                            return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                        }} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className='flex flex-col gap-1'>
                        <Label className="">Years of Experience</Label>
                        <Input type="number" placeholder="Years of Experience" {...register("years")} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label className="">Projects</Label>
                        <Input type="number" placeholder="Projects" {...register("projects")} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label className="">Clients</Label>
                        <Input type="number" placeholder="Clients" {...register("clients")} />
                    </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label className="">Image</Label>
                        <ImageUploader onChange={(url) => setValue("aboutImage", url)} value={watch("aboutImage")} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label className="">Image Alt Tag</Label>
                        <Input type="text" placeholder="Image Alt Tag" {...register("aboutImageAltTag")} />
                    </div>
                </div>
            </form>




            <div className="h-fit w-full p-5 shadow-md border-gray-300 rounded-md mt-5 bg-white">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Process</Label>
                    <Dialog>
                        <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => { setProcessTitle(""); }}>Add Item</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Item</DialogTitle>
                                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                    <div>
                                        <Label>Title</Label>
                                        <Input type="text" placeholder="Title" value={processTitle} onChange={(e) => setProcessTitle(e.target.value)} />
                                    </div>
                                </div>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddProcess}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                    {process.map((item, index) => (
                        <div key={index} className="relative flex  justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <h3 className="text-[16px]">{item.title}</h3>
                                </div>
                            </div>
                            <div className="absolute top-1 right-1 flex gap-2">
                                <Dialog>
                                    <DialogTrigger className=" text-white px-2 py-1 rounded-md" onClick={() => { setProcessTitle(item.title); }}>
                                        <MdEdit className="text-black cursor-pointer" />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Item</DialogTitle>
                                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">

                                                <div>
                                                    <Label>Title</Label>
                                                    <Input type="text" placeholder="Title" value={processTitle} onChange={(e) => setProcessTitle(e.target.value)} />
                                                </div>
                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditProcess(item._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>

                                <MdDelete className="mt-1 cursor-pointer text-black" onClick={() => handleDeleteProcess(item._id)} />

                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="h-fit w-full p-5 shadow-md border-gray-300 rounded-md mt-5 bg-white">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Testimonials</Label>
                    <Dialog>
                        <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => { setTestimonialContent(""); setTestimonialImage(""); setTestimonialName(""); setTestimonialCompany(""); setTestimonialImageAltTag("") }}>Add Item</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Item</DialogTitle>
                                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                    <div>
                                        <Label>Content</Label>
                                        <Textarea placeholder="Content" value={testimonialContent} onChange={(e) => setTestimonialContent(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Image</Label>
                                        <ImageUploader onChange={(url) => setTestimonialImage(url)} value={testimonialImage} />
                                    </div>
                                    <div>
                                        <Label>Image Alt Tag</Label>
                                        <Input type="text" placeholder="Image Alt Tag" value={testimonialImageAltTag} onChange={(e) => setTestimonialImageAltTag(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Name</Label>
                                        <Input type="text" placeholder="Name" value={testimonialName} onChange={(e) => setTestimonialName(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Company</Label>
                                        <Input type="text" placeholder="Company" value={testimonialCompany} onChange={(e) => setTestimonialCompany(e.target.value)} />
                                    </div>
                                </div>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddTestimonial}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2 h-fit">
                    {testimonials.map((item, index) => (
                        <div key={index} className="relative flex  justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <h3 className="text-[16px]">{item.name}</h3>
                                </div>
                            </div>
                            <div className="absolute top-1 right-1 flex gap-2">
                                <Dialog>
                                    <DialogTrigger className=" text-white px-2 py-1 rounded-md" onClick={() => { setTestimonialName(item.name); setTestimonialCompany(item.company); setTestimonialImage(item.image); setTestimonialContent(item.content); setTestimonialImageAltTag(item.testimonialImageAltTag) }}>
                                        <MdEdit className="text-black cursor-pointer" />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Item</DialogTitle>
                                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">

                                                <div>
                                                    <Label>Image</Label>
                                                    <ImageUploader onChange={(url) => setTestimonialImage(url)} value={testimonialImage} />
                                                </div>
                                                <div>
                                                    <Label>Image Alt Tag</Label>
                                                    <Input type="text" placeholder="Image Alt Tag" value={testimonialImageAltTag} onChange={(e) => setTestimonialImageAltTag(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Content</Label>
                                                    <Input type="text" placeholder="Content" value={testimonialContent} onChange={(e) => setTestimonialContent(e.target.value)} />
                                                </div>

                                                <div>
                                                    <Label>Name</Label>
                                                    <Input type="text" placeholder="Name" value={testimonialName} onChange={(e) => setTestimonialName(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Company</Label>
                                                    <Input type="text" placeholder="Company" value={testimonialCompany} onChange={(e) => setTestimonialCompany(e.target.value)} />
                                                </div>

                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditTestimonial(item._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>

                                <MdDelete className="mt-1 cursor-pointer text-black" onClick={() => handleDeleteTestimonial(item._id)} />

                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}


