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
import { Button } from '@/components/ui/button';



const AdminContact = () => {
    const [regionList, setRegionList] = useState<{ _id: string, region: string }[]>([]);
    const [region, setRegion] = useState<string>("");
    const [regionId, setRegionId] = useState<string>("");
    const [areaList, setAreaList] = useState<{ _id: string, name: string, type: string, address: string, telephone: string, mobile: string, email: string, mapIframe: string }[]>([]);
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mapIframe, setMapIframe] = useState<string>("");
    const [metaTitle, setMetaTitle] = useState<string>("");
    const [metaDescription, setMetaDescription] = useState<string>("");


    const handleFetchRegion = async () => {
        try {
            const response = await fetch("/api/admin/contact");
            if (response.ok) {
                const data = await response.json();
                setRegionList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching type", error);
        }

    }

    const handleFetchArea = async () => {
        try {
            const response = await fetch(`/api/admin/contact/area?regionId=${regionId}`);
            if (response.ok) {
                const data = await response.json();
                setAreaList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching area", error);
        }
    }

    const handleFetchMeta = async () => {
        try {
            const response = await fetch("/api/admin/contact/meta");
            if (response.ok) {
                const data = await response.json();
                setMetaTitle(data.data.metaTitle);
                setMetaDescription(data.data.metaDescription);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching meta", error);
        }
    }

    const handleAddRegion = async () => {
        try {
            const response = await fetch("/api/admin/contact", {
                method: "POST",
                body: JSON.stringify({ region })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchRegion();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in adding region", error);
        }
    }

    const handleEditRegion = async (id:string) => {
        try {
            const response = await fetch(`/api/admin/contact`, {
                method: "PATCH",
                body: JSON.stringify({ id, region })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchRegion();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in editing region", error);
        }
    }

    const handleDeleteRegion = async (id:string) => {
        try {
            const response = await fetch(`/api/admin/contact`, {
                method: "DELETE",
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchRegion();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in deleting region",error);
        }
    }

    const handleSetAddArea = () => {
        setName("");
        setType("");
        setAddress("");
        setTelephone("");
        setEmail("");
        setMobile("");
        setMapIframe("");
    }

    const handleAddArea = async () => {
        try {
            const response = await fetch(`/api/admin/contact/area`, {
                method: "POST",
                body: JSON.stringify({ name, type, address, telephone, mobile, email, mapIframe, regionId })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchArea();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in adding area", error);
        }
    }

    const handleSetEditArea = (item: { _id: string, name: string, type: string, address: string, telephone: string, mobile: string, email: string, mapIframe: string }) => {
        setName(item.name);
        setType(item.type);
        setAddress(item.address);
        setTelephone(item.telephone);
        setMobile(item.mobile);
        setEmail(item.email);
        setMapIframe(item.mapIframe);
    }

    const handleEditArea = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/contact/area`, {
                method: "PATCH",
                body: JSON.stringify({ id, name, type, address, telephone, mobile, email, mapIframe, regionId })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchArea();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in editing area", error);
        }
    }

    const handleDeleteArea = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/contact/area`, {
                method: "DELETE",
                body: JSON.stringify({ id,regionId })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchArea();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in deleting area", error);
        }
    }

    const handleSaveMeta = async () => {
        try {
            const response = await fetch("/api/admin/contact/meta", {
                method: "POST",
                body: JSON.stringify({ metaTitle, metaDescription })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in saving meta", error);
        }
    }

    useEffect(() => {
        handleFetchRegion();
        handleFetchMeta();
    }, [])

    useEffect(() => {
        if (regionId != "") {
            handleFetchArea();
        }
    }, [regionId])

    return (
        <div className=" grid grid-cols-1 gap-10">
            <div className="h-fit w-full p-2 border-2 border-gray-300 rounded-md mt-5">
                            <div className="flex justify-between border-b-2 pb-2">
                                <Label className="text-sm font-bold">Meta Section</Label>
                                <Button onClick={handleSaveMeta}>Save</Button>
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
            <div className="h-full w-full p-2 border-2 border-gray-300 rounded-md">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Regions</Label>
                    <Dialog>
                        <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setRegion("")}>Add Region</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Region</DialogTitle>
                                <DialogDescription>
                                    <Input type="text" placeholder="Region" value={region} onChange={(e) => setRegion(e.target.value)} />
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddRegion}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className="mt-2 flex flex-col gap-2 h-[80%] overflow-y-auto">
                    {regionList.map((item) => (
                        <div className="flex justify-between border p-1 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                            <div className='text-sm'>
                                {item.region}
                            </div>
                            <div className="flex gap-5">
                                <Sheet>
                                    <SheetTrigger onClick={() => { setRegionId(item._id) }}><FaPlus /></SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle className='flex gap-2 items-center'>Add Area
                                                <Dialog>
                                                    <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={handleSetAddArea}><FaPlusCircle /></DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Add Area</DialogTitle>
                                                            <DialogDescription className='flex flex-col gap-3'>
                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Name</Label>
                                                                <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Type</Label>
                                                                <Input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Address</Label>
                                                                <Input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Telephone</Label>
                                                                <Input type="text" placeholder="Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Mobile</Label>
                                                                <Input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Email</Label>
                                                                <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Map Iframe</Label>
                                                                <Input type="text" placeholder="Map Iframe" value={mapIframe} onChange={(e) => setMapIframe(e.target.value)} />
                                                                </div>
                                                                

                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddArea}>Save</DialogClose>
                                                    </DialogContent>

                                                </Dialog>

                                            </SheetTitle>

                                            <div className='flex flex-col gap-2 mt-5'>
                                                {areaList.map((item) => (
                                                    <div key={item._id} className="flex justify-between border p-1 items-center rounded-md">
                                                        {item.name}
                                                        <div className='flex gap-5'>
                                                            <Dialog>
                                                                <DialogTrigger onClick={() => handleSetEditArea(item)}><MdEdit /></DialogTrigger>
                                                                <DialogContent>
                                                                    <DialogHeader>
                                                                        <DialogTitle>Edit Area</DialogTitle>
                                                                        <DialogDescription className='flex flex-col gap-3'>
                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Name</Label>
                                                                <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Type</Label>
                                                                <Input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Address</Label>
                                                                <Input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Telephone</Label>
                                                                <Input type="text" placeholder="Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Mobile</Label>
                                                                <Input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Email</Label>
                                                                <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                                </div>

                                                                <div className='flex flex-col gap-2'>
                                                                <Label>Map Iframe</Label>
                                                                <Input type="text" placeholder="Map Iframe" value={mapIframe} onChange={(e) => setMapIframe(e.target.value)} />
                                                                </div>
                                                                

                                                            </DialogDescription>
                                                                    </DialogHeader>
                                                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditArea(item._id)}>Save</DialogClose>
                                                                </DialogContent>

                                                            </Dialog>

                                                            <MdDelete onClick={() => handleDeleteArea(item._id)} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>

                                <Dialog>
                                    <DialogTrigger onClick={() => setRegion(item.region)}><MdEdit /></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Region</DialogTitle>
                                            <DialogDescription>
                                                <Input type="text" placeholder="Region" value={region} onChange={(e) => setRegion(e.target.value)} />
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditRegion(item._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>
                                


                                <MdDelete onClick={() => handleDeleteRegion(item._id)}/>

                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default AdminContact