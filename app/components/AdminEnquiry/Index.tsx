"use client"

import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import { BiExpandAlt } from "react-icons/bi";



const AdminEnquiry = () => {
    const [enquiryList, setEnquiryList] = useState<{ _id: string, name: string, email: string, phone: string, message: string }[]>([]);


    const handleFetchEnquiry = async () => {
        try {
            const response = await fetch("/api/admin/contact/enquiry");
            if (response.ok) {
                const data = await response.json();
                setEnquiryList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching type", error);
        }

    }


    const handleDeleteEnquiry = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/contact/enquiry`, {
                method: "DELETE",
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchEnquiry();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in deleting enquiry", error);
        }
    }




    useEffect(() => {
        handleFetchEnquiry();
    }, [])


    return (
        <div className="h-screen grid grid-cols-1 gap-5">
            <div className="h-full w-full p-2 border-2 border-gray-300 rounded-md">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Enquiries</Label>
                </div>
                <div className="mt-2 flex flex-col gap-2 h-[80%] overflow-y-auto">
                    {enquiryList.map((item) => (
                        <div className="flex justify-between border p-1 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                            <div className='text-sm'>
                                {item.name}
                            </div>
                            <div className="flex gap-5">
                                <Dialog>
                                    <DialogTrigger><BiExpandAlt /></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Details</DialogTitle>
                                            <div className='flex flex-col gap-3'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label>Name</Label>
                                                    <Input type="text" placeholder="Name" value={item.name} readOnly/>
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <Label>Email</Label>
                                                    <Input type="text" placeholder="Email" value={item.email} readOnly/>
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <Label>Phone</Label>
                                                    <Input type="text" placeholder="Phone" value={item.phone} readOnly/>
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <Label>Message</Label>
                                                    <Textarea placeholder="Message" value={item.message} readOnly/>
                                                </div>



                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Close</DialogClose>
                                    </DialogContent>

                                </Dialog>


                                <MdDelete onClick={() => handleDeleteEnquiry(item._id)} />

                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default AdminEnquiry