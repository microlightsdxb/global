"use client"

import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FaGear } from "react-icons/fa6";

const AdminServices = () => {
    const [services, setServices] = useState<{ _id: string, name: string, thumbnail: string, slug: string }[]>([]);
    const [refetch, setRefetch] = useState(false);
    const [name, setName] = useState("")
    const [slug,setSlug] = useState("")

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("/api/admin/service")
                if (response.ok) {
                    const data = await response.json();
                    setServices(data.data)
                } else {
                    console.log("Error in fetching services")
                }
            } catch (error) {
                console.log("Error in fetching services", error)
            }
        }
        fetchServices()
    }, [refetch])

    const handleAddService = async () => {
        try {
            const response = await fetch("/api/admin/service", {
                method: "POST",
                body: JSON.stringify({ name, slug })
            })
            if (response.ok) {
                const data = await response.json();
                alert(data.message)
                setRefetch(!refetch)
            } else {
                const data = await response.json();
                alert(data.message)
            }
        } catch (error) {
            console.log("Error in adding service", error)
        }
    }

    const handleEditService = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/service?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ name, slug })
            })
            if (response.ok) {
                const data = await response.json();
                alert(data.message)
                setRefetch(!refetch)
            } else {
                const data = await response.json();
                alert(data.message)
            }
        } catch (error) {
            console.log("Error in editing service", error)
        }
    }

    const handleDeleteService = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/service?id=${id}`, {
                method: "DELETE"
            })
            if (response.ok) {
                const data = await response.json();
                alert(data.message)
                setRefetch(!refetch)
            } else {
                const data = await response.json();
                alert(data.message)
            }
        } catch (error) {
            console.log("Error in deleting service", error)
        }
    }

    useEffect(() => {
        setSlug(name.toLowerCase().replace(/\s+/g, '-'))
    }, [name])

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between'>
                <h1 className='text-md font-bold'>Services</h1>
                <Dialog>
                    <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => { setName(""); setSlug("") }}>Add Item</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Item</DialogTitle>
                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                <div>
                                    <Label>Name</Label>
                                    <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div>
                                    <Label>Slug</Label>
                                    <Input type="text" readOnly placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                                </div>
                            </div>
                        </DialogHeader>
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddService}>Save</DialogClose>
                    </DialogContent>

                </Dialog>
            </div>
            <div className='flex flex-col gap-2 overflow-y-auto h-screen'>
                {services.map((service, index) => (
                    <div key={index} className='flex justify-between border p-4 rounded-md items-center shadow-md hover:shadow-lg transition-all duration-300'>
                        <div className='flex gap-5 items-center h-full'>
                            <div>{service.name}</div>
                        </div>
                        <div className='flex gap-5'>
                            {/* <Link href={`/admin/services/edit/${service._id}`}><MdEdit /></Link> */}
                            <Dialog>
                                <DialogTrigger onClick={() => { setName(service.name); setSlug(service.slug) }}><MdEdit /></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add Item</DialogTitle>
                                        <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                                            <div>
                                                <Label>Name</Label>
                                                <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>Slug</Label>
                                                <Input type="text" readOnly placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                                            </div>
                                        </div>
                                    </DialogHeader>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditService(service._id)}>Save</DialogClose>
                                </DialogContent>

                            </Dialog>
                            <Link href={`/admin/services/edit/${service._id}`}><FaGear /></Link>
                            <MdDelete onClick={() => handleDeleteService(service._id)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminServices