"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Controller, useFieldArray } from 'react-hook-form'
import {ImageUploader} from '@/components/ui/image-uploader'
import { Input } from '@/components/ui/input'
import { useParams } from 'next/navigation'
import {closestCorners, DndContext, DragEndEvent} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import MemberCard from './MemberCard'
import { TbReorder } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import { useRouter } from 'next/navigation';

interface MembersData {
    name: string;
    image: string;
    imageAlt: string;
    designation: string;
}

interface TeamsData {
    members:MembersData[]
}

const DepartmentPage =  () => {

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<TeamsData>();
    const [reorderMode, setReorderMode] = useState(false);
    const router = useRouter();

    const {departmentId} = useParams();

        const { fields: membersFields, append: membersAppend, remove: membersRemove, move: membersMove } = useFieldArray({
            control,
            name: "members"
        });

        const fetchMembers = async () => {
            try {
                const response = await fetch("/api/admin/team/department/members?id="+departmentId);
                const data = await response.json();
                console.log(data)
                setValue("members", data.data);
            } catch (error) {
                console.log("Error fetching members", error);
            }
        }

        useEffect(() => {
            fetchMembers();
        }, []);

const submitMembers = async (data: TeamsData) => {
    try {
        const response = await fetch("/api/admin/team/department/members?id="+departmentId, {
            method: "POST",
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            router.push("/admin/team");
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.log("Error submitting members", error);
    }
}


const getTaskPos = (id: number | string) => membersFields.findIndex((item:{id:string})=>( item.id == id))
const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
  
    if (!over || active.id === over.id) return;
  
    const fromIndex = getTaskPos(active.id);
    const toIndex = getTaskPos(over.id);

  
    if (fromIndex !== -1 && toIndex !== -1) {
      membersMove(fromIndex, toIndex);
    }
  };


  return (
    <form onSubmit={handleSubmit(submitMembers)} className='p-5 shadow-md border-gray-300 rounded-md bg-white'>
                    <div className="flex justify-between border-b-2 pb-2 mb-5">
                        <Label className="text-sm font-bold">Members Section</Label>
                        <div className='flex gap-2'>
                        <Button type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>
                        <Button type="submit">Save</Button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                                <div>
                        <Label className=''>Members</Label>
                    <div className='border p-2 rounded-md flex flex-col gap-5 mt-2'>
    
    {reorderMode && 
    
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <SortableContext items={membersFields.map((member) => member.id)} strategy={verticalListSortingStrategy}>
                    {membersFields?.map((member, index) => (
                        <MemberCard key={index} member={member} id={member.id}/>
                    ))}
                </SortableContext>
            </DndContext>

    }

    
                        {!reorderMode && membersFields.map((field, index) => (
                            <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
                                <div className='absolute top-0 right-2'>
                                    <RiDeleteBinLine onClick={() => membersRemove(index)} className='cursor-pointer text-red-600' />
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className=''>Image</Label>
                                        <Controller
                                            name={`members.${index}.image`}
                                            control={control}
                                            rules={{ required: "Image is required" }}
                                            render={({ field }) => (
                                                <ImageUploader
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                        {errors.members?.[index]?.image && <p className='text-red-500'>{errors.members?.[index]?.image.message}</p>}
                                        <div className='flex flex-col gap-2'>
                                        <Label className=''>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`members.${index}.imageAlt`)} />
                                    </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className=''>Name</Label>
                                        <Input type='text' placeholder='Name' {...register(`members.${index}.name`)} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className=''>Designation</Label>
                                        <Input type='text' placeholder='Designation' {...register(`members.${index}.designation`)} />
                                    </div>
                                    </div>
                                </div>
    
                            </div>
                        ))}
    
                    </div>
                    <div className='flex justify-end mt-2'>
                            <Button type='button' className="cursor-pointer" onClick={() => membersAppend({ image: "", imageAlt: "", name: "",designation:"" })}>Add Member</Button>
                        </div>
                    </div>
    
                    
                    </div>
                    </form>
  )
}

export default DepartmentPage