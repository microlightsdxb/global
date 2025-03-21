"use client"

import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FaPlusCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";



const TypePage = () => {
    const [typeList, setTypeList] = useState<{ _id: string, type: string }[]>([]);
    const [type, setType] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [typeId, setTypeId] = useState<string>("");
    const [categoryList, setCategoryList] = useState<{ _id: string, name: string }[]>([]);

    const handleFetchType = async () => {
        try {
            const response = await fetch("/api/admin/product/type");
            if (response.ok) {
                const data = await response.json();
                setTypeList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching type", error);
        }

    }

    const handleFetchCategory = async () => {
        try {
            const response = await fetch(`/api/admin/product/category?typeId=${typeId}`);
            if (response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching category", error);
        }
    }

    const handleAddType = async () => {
        try {
            const response = await fetch("/api/admin/product/type", {
                method: "POST",
                body: JSON.stringify({ type })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchType();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in adding type", error);
        }
    }

    const handleEditType = async (id:string) => {
        try {
            const response = await fetch(`/api/admin/product/type`, {
                method: "PATCH",
                body: JSON.stringify({ id, type })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchType();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in editing type", error);
        }
    }

    const handleDeleteType = async (id:string) => {
        try {
            const response = await fetch(`/api/admin/product/type`, {
                method: "DELETE",
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchType();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in deleting type",error);
        }
    }

    const handleAddCategory = async () => {
        try {
            const response = await fetch(`/api/admin/product/category`, {
                method: "POST",
                body: JSON.stringify({ category, typeId })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCategory();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in adding category", error);
        }
    }

    const handleEditCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/product/category`, {
                method: "PATCH",
                body: JSON.stringify({ id, category, typeId })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCategory();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in editing category", error);
        }
    }

    const handleDeleteCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/product/category`, {
                method: "DELETE",
                body: JSON.stringify({ id, typeId })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCategory();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in deleting category", error);
        }
    }

    useEffect(() => {
        handleFetchType();
    }, [])

    useEffect(() => {
        if (typeId != "") {
            handleFetchCategory();
        }
    }, [typeId])

    return (
        <div className="h-screen grid grid-cols-1 gap-5">
            <div className="h-full w-full p-2 border-2 border-gray-300 rounded-md">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Types</Label>
                    <Dialog>
                        <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setType("")}>Add Type</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Type</DialogTitle>
                                <DialogDescription>
                                    <Input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddType}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className="mt-2 flex flex-col gap-2 h-[80%] overflow-y-auto">
                    {typeList.map((item) => (
                        <div className="flex justify-between border p-1 items-center rounded-md" key={item._id}>
                            <div>
                                {item.type}
                            </div>
                            <div className="flex gap-5">
                                <Sheet>
                                    <SheetTrigger onClick={() => { setTypeId(item._id) }}><FaPlus /></SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle className='flex gap-2 items-center'>Add Category
                                                <Dialog>
                                                    <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setCategory("")}><FaPlusCircle /></DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Add Category</DialogTitle>
                                                            <DialogDescription>
                                                                <Input type="text" placeholder="Type" value={category} onChange={(e) => setCategory(e.target.value)} />
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddCategory}>Save</DialogClose>
                                                    </DialogContent>

                                                </Dialog>

                                            </SheetTitle>

                                            <div className='flex flex-col gap-2 mt-5'>
                                                {categoryList.map((item) => (
                                                    <div key={item._id} className="flex justify-between border p-1 items-center rounded-md">
                                                        {item.name}
                                                        <div className='flex gap-5'>
                                                            <Dialog>
                                                                <DialogTrigger onClick={() => setCategory(item.name)}><MdEdit /></DialogTrigger>
                                                                <DialogContent>
                                                                    <DialogHeader>
                                                                        <DialogTitle>Edit Category</DialogTitle>
                                                                        <DialogDescription>
                                                                            <Input type="text" placeholder="Type" value={category} onChange={(e) => setCategory(e.target.value)} />
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditCategory(item._id)}>Save</DialogClose>
                                                                </DialogContent>

                                                            </Dialog>

                                                            <MdDelete onClick={() => handleDeleteCategory(item._id)} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>

                                <Dialog>
                                    <DialogTrigger onClick={() => setType(item.type)}><MdEdit /></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Type</DialogTitle>
                                            <DialogDescription>
                                                <Input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditType(item._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>
                                


                                <MdDelete onClick={() => handleDeleteType(item._id)}/>

                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default TypePage