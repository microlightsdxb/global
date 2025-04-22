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
import { FaPlusCircle } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useParams, useRouter } from 'next/navigation';

import { MdDelete, MdEdit } from 'react-icons/md'
import { FileUploader } from '@/components/ui/file-uploader'

interface ProductFormProps {
    name: string;
    slug:string;
    type: string;
    category: string;
    wattage: string;
    lumen: string;
    images: string[];
    thumbnail: string;
    altTag: string;
    specifications:{name:string,items:{title:string,value:string}[]}[]
    file:string;
    metaTitle:string;
    metaDescription:string;
}


const ProductForm = ({ editMode }: { editMode?: boolean }) => {
    
    const router = useRouter();
    const {id} = useParams();

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<ProductFormProps>();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [typeList, setTypeList] = useState<{ type: string, _id: string }[]>([]);
    const [typeSelected, setTypeSelected] = useState<boolean>(false);
    const [categoryList, setCategoryList] = useState<{ name: string, _id: string }[]>([]);
    const [specifications, setSpecifications] = useState<{ name: string, items: { title: string, value: string }[] }[]>([]);
    const [specificationName, setSpecificationName] = useState<string>("");
    const [specificationItems, setSpecificationItems] = useState<{ title: string, value: string }[]>([]);
    const [itemTitle, setItemTitle] = useState<string>("");
    const [itemValue, setItemValue] = useState<string>("");
    const [selectedSpecification, setSelectedSpecification] = useState<number>(-1);
    const [editItemId, setEditItemId] = useState<number>(-1);
    const [category,setCategory] = useState<string>("")


    const handleFetchProduct = async () => {
        try {
            const response = await fetch(`/api/admin/product?id=${id}`)
            if(response.ok){
                const data = await response.json();
                setValue("name",data.data.name)
                setValue("slug",data.data.slug)
                setValue("wattage",data.data.wattage)
                setValue("lumen",data.data.lumen)
                setValue("type",data.data.type)
                setValue("category",data.data.category)
                setValue("images",data.data.images)
                setImageUrls(data.data.images)
                setValue("thumbnail",data.data.thumbnail)
                setValue("altTag",data.data.altTag)
                setSpecifications(data.data.specifications)
                setValue("file",data.data.file)
                setCategory(data.data.category)
                setValue("metaTitle",data.data.metaTitle)
                setValue("metaDescription",data.data.metaDescription)
            }else{
                console.log("Error in fetching product")
            }
        } catch (error) {
            console.log("Error in fetching product",error)
        }
    }


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

    const handleFetchType = async () => {
        try {
            const response = await fetch("/api/admin/product/type");
            if (response.ok) {
                const data = await response.json();
                setTypeList(data.data);
            } else {
                console.log("Error in fetching type");
            }
        } catch (error) {
            console.log("Error in fetching type", error);
        }
    }

    const fetchCategory = async (typeId: string) => {
        try {
            const response = await fetch(`/api/admin/product/category?typeId=${typeId}`);
            if (response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            } else {
                console.log("Error in fetching category");
            }
        } catch (error) {
            console.log("Error in fetching category", error);
        }
    }

    const handleSetAddItem = (index: number) => {
        setSelectedSpecification(index);
        setSpecificationItems(() => (
            specifications[index].items
        ));
    }


    const handleAddSpecification = () => {
        setSpecifications((prev) => [...prev, { name: specificationName, items: [] }]);
        setSpecificationName("");
    }

    const handleAddItem = () => {
        setSpecificationItems((prev) => [...prev, { title: itemTitle, value: itemValue }]);
        setItemTitle("");
        setItemValue("");
    }

    const handleSetSpecification = () => {
        setSpecifications((prev) => prev.map((item, index) => index === selectedSpecification ? { ...item, items: specificationItems } : item));
        setSelectedSpecification(-1);
        setSpecificationItems([]);
    }

    const handleEditSpecification = () => {
        setSpecifications((prev) => prev.map((item, index) => index === selectedSpecification ? { ...item, name: specificationName } : item));
        setSpecificationName("");
    }

    const handleDeleteSpecification = (index: number) => {
        setSpecifications((prev) => prev.filter((_, i) => i !== index));
    }

    const handleEditItem = () => {
        const item = specificationItems.find((_,i)=>i===editItemId);
        if(!item) return;
        setSpecificationItems(()=>specificationItems.map((prev) =>
            prev.title === item.title ? { ...prev, title:itemTitle , value: itemValue } : prev
        ))
    }

    const handleDeleteItem = (index: number) => {
        setSpecificationItems(()=>specificationItems.filter((_,i)=>i!==index));
    }

    const handleAddProduct = async (data: ProductFormProps) => {
        try {
            const response = await fetch(editMode ? "/api/admin/product?id="+id:"/api/admin/product",{
                method:editMode ? "PATCH":"POST",
                body:JSON.stringify(data)
            })
            if(response.ok){
                const data = await response.json();
                alert(data.message)
                router.push("/admin/products")
            }else{
                const data = await response.json();
                alert(data.message)
            }
        } catch (error) {
            console.log("Error in adding product",error)
        }
    }


    useEffect(() => {
        if(editMode){
            handleFetchType().then(()=>handleFetchProduct())
        }else{
            handleFetchType();
        }
    }, [])


    useEffect(() => {
        setValue("specifications",specifications)
    }, [specifications])



    useEffect(() => {

        if(typeList.length === 0) return;

        if (watch("type") == undefined) {
            setTypeSelected(false);
        } else {
            const typeId = typeList.find((item) => item.type === watch("type"))?._id;
            console.log("typeId",typeId)
            if (typeId) {
                fetchCategory(typeId);
                setTypeSelected(true);
            }
        }
    }, [watch("type"),typeList])

    useEffect(()=>{
        setValue("category",category)
    },[categoryList])

    useEffect(()=>{
        if(watch("slug") === undefined) return;
        const slug = watch("slug").replace(/\s+/g, '-');
        setValue("slug", slug);
    },[watch("slug")])


    return (
        <div className='flex flex-col gap-5'>
            <h1 className='text-lg font-bold'>{editMode ? "Edit Product" : "Add Product"}</h1>
            <form className='flex flex-col gap-5 border p-2 rounded-md' onSubmit={handleSubmit(handleAddProduct)}>
                <div className='grid grid-cols-2 gap-2'>
                    <div>
                        <Label className='pl-3 font-bold'>Name</Label>
                        <Input type='text' placeholder='Product Name' {...register("name", { required: "Name is required" })} />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div>
                        <Label className='pl-3 font-bold'>Slug</Label>
                        <Input type='text' placeholder='Product Slug' {...register("slug", { required: "Slug is required",pattern: {
        value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
        message: "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)"
      } })} />
                        {errors.slug && <p className='text-red-500'>{errors.slug.message}</p>}
                    </div>
                    <div>
                        <div className='flex flex-col gap-2'>
                        <Label className='pl-3 font-bold'>Thumbnail</Label>
                        <ImageUploader onChange={(url) => setValue("thumbnail", url)} value={watch("thumbnail")}/>
                        {errors.thumbnail && <p className='text-red-500'>{errors.thumbnail.message}</p>}
                        <div>
                        <Label className='pl-3 font-bold'>Alt Tag</Label>
                        <Input type='text' placeholder='Alt Tag' {...register("altTag")} />
                        </div>
                    </div>
                    </div>
                    
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Wattage</Label>
                    <Input type='text' placeholder='Wattage' {...register("wattage", { required: "Wattage is required" })} />
                    {errors.wattage && <p className='text-red-500'>{errors.wattage.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Lumen</Label>
                    <Input type='text' placeholder='Lumen' {...register("lumen", { required: "Lumen is required" })} />
                    {errors.lumen && <p className='text-red-500'>{errors.lumen.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Type</Label>
                    <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Type is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {typeList.map((item) => (
                                        <SelectItem key={item._id} value={item.type}>
                                            {item.type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.type && <p className="text-red-500">{errors.type.message}</p>}

                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Category</Label>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                                disabled={!typeSelected}
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

                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Data Sheet</Label>
                    <FileUploader onChange={(url)=>setValue("file",url)} value={watch("file")}/>
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
                    <div className='flex gap-2'>
                        <Label className='pl-3 font-bold'>Specifications</Label>
                        <Dialog>
                            <DialogTrigger><FaPlusCircle /></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Specification</DialogTitle>
                                    <DialogDescription>
                                        <Input type="text" placeholder="Specification Name" value={specificationName} onChange={(e) => setSpecificationName(e.target.value)} />
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddSpecification}>Save</DialogClose>
                            </DialogContent>

                        </Dialog>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {specifications?.map((item, index) => (
                            <div className='flex justify-between border p-2 rounded-md' key={index}>
                                <div className='flex gap-2'>
                                    <div>{item.name}</div>
                                </div>
                                <div className='flex gap-5 items-center'>
                                    <Sheet>
                                        <SheetTrigger onClick={() => handleSetAddItem(index)}><FaPlusCircle /></SheetTrigger>
                                        <SheetContent className='h-screen overflow-y-auto'>
                                            <SheetHeader>
                                                <div className='flex gap-2 items-center'>
                                                    <SheetTitle>Add Items</SheetTitle>
                                                    <Dialog>
                                                        <DialogTrigger><FaPlusCircle /></DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Add Item</DialogTitle>

                                                                <div className='flex gap-2'>
                                                                    <Label className='text-sm'>Title</Label>
                                                                    <Input type="text" value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} />
                                                                </div>
                                                                <div className='flex gap-2'>
                                                                    <Label className='text-sm'>Value</Label>
                                                                    <Input type="text" value={itemValue} onChange={(e) => setItemValue(e.target.value)} />
                                                                </div>

                                                            </DialogHeader>
                                                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddItem}>Save</DialogClose>
                                                        </DialogContent>

                                                    </Dialog>
                                                </div>
                                                {specificationItems.map((item,itemIdex) => (
                                                    <div className='flex justify-between border p-2 rounded-md gap-2 relative' key={itemIdex}>
                                                        
                                                        <Dialog>
                                                        <DialogTrigger onClick={()=>{setEditItemId(itemIdex);setItemTitle(item.title);setItemValue(item.value);}}><MdEdit className='absolute top-1 right-10'/></DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Item</DialogTitle>

                                                                <div className='flex gap-2'>
                                                                    <Label className='text-sm'>Title</Label>
                                                                    <Input type="text" value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} />
                                                                </div>
                                                                <div className='flex gap-2'>
                                                                    <Label className='text-sm'>Value</Label>
                                                                    <Input type="text" value={itemValue} onChange={(e) => setItemValue(e.target.value)} />
                                                                </div>

                                                            </DialogHeader>
                                                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleEditItem}>Save</DialogClose>
                                                        </DialogContent>

                                                    </Dialog>

                                                        
                                                        <MdDelete className='absolute top-1 right-2' onClick={()=>handleDeleteItem(itemIdex)}/>


                                                        <div>
                                                            <Label className='text-sm font-bold'>Title</Label>
                                                            <Input type='text' value={item.title} readOnly />
                                                        </div>
                                                        <div>
                                                            <Label className='text-sm font-bold'>Value</Label>
                                                            <Input type='text' value={item.value} readOnly />
                                                        </div>
                                                    </div>
                                                ))}

                                                <DialogClose onClick={handleSetSpecification} className='bg-black text-white px-2 py-1 rounded-md'>Confirm</DialogClose>
                                            </SheetHeader>
                                        </SheetContent>
                                    </Sheet>


                                    <Dialog>
                                        <DialogTrigger onClick={()=>{setSpecificationName(item.name);setSelectedSpecification(index)}}><MdEdit /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Specification</DialogTitle>

                                                <div className='flex gap-2 flex-col'>
                                                    <Label className='text-sm'>Name</Label>
                                                    <Input type="text" value={specificationName} onChange={(e) => setSpecificationName(e.target.value)} />
                                                </div>

                                            </DialogHeader>
                                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleEditSpecification}>Save</DialogClose>
                                        </DialogContent>

                                    </Dialog>

                                    
                                    <MdDelete onClick={()=>{handleDeleteSpecification(index)}}/>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="h-fit w-full p-2 border-2 border-gray-300 rounded-md mt-5">
                    <div className="flex justify-between border-b-2 pb-2">
                        <Label className="text-sm font-bold">Meta Section</Label>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                        <div>
                            <Label>Meta title</Label>
                            <Input type="text" {...register('metaTitle')} />
                        </div>
                        <div>
                            <Label>Meta Description</Label>
                            <Input type="text" {...register('metaDescription')} />
                        </div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <Button type='submit'>Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default ProductForm