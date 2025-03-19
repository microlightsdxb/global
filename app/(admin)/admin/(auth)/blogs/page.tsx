"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function Blogs() {

  const [oldCategory, setOldCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [blogList, setBlogList] = useState<{_id: string, title: string, image: string}[]>([]);
  const [categoryList, setCategoryList] = useState<{_id: string, name: string}[]>([]);
  const router = useRouter();

  const handleFetchBlogs = async() => {
    try {
      const response = await fetch("/api/admin/blog");
      if(response.ok) {
        const data = await response.json();
        setBlogList(data.data);
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching industry", error);
    }
  }
  
  const handleAddCategory = async() => {
    try {
      const response = await fetch("/api/admin/category",{
        method: "POST",
        body: JSON.stringify({ name: category }),
      });
      if(response.ok) {
        const data = await response.json();
        setCategory("");
        alert(data.message);
        handleFetchCategory();
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding industry", error);
    }
  }

  const handleFetchCategory = async() => {
    try {
      const response = await fetch("/api/admin/category");
      if(response.ok) {
        const data = await response.json();
        setCategoryList(data.data);
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching category", error);
    }
  }

  const handleEditCategory = async(id: string) => {
    try {
      const response = await fetch(`/api/admin/category?id=${id}`,{
        method: "PATCH",
        body: JSON.stringify({ name: category ,  oldName: oldCategory }),
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchCategory();
        setOldCategory("");
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error editing category", error);
    }
  }

  const handleDeleteCategory = async(id: string) => {
    try {
      const response = await fetch(`/api/admin/category?id=${id}`,{
        method: "DELETE",
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchCategory();
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting category", error);
    }
  }


  const handleDeleteBlog = async(id: string) => {
    try {
      const response = await fetch(`/api/admin/blog?id=${id}`,{
        method: "DELETE",
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchBlogs();
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting project", error);
    }
  }

  useEffect(()=>{
    handleFetchCategory();
    handleFetchBlogs();
  },[])

  return (
    <div className="h-screen grid grid-cols-1 gap-5">
        <div className="h-full w-full p-2 border-2 border-gray-300 rounded-md overflow-y-auto">
          <div className="flex justify-between border-b-2 pb-2">
            <Label className="text-sm font-bold">Category</Label>
            <Dialog>
              <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>setCategory("")}>Add Category</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                  <DialogDescription>
                    <Input type="text" placeholder="Category Name" value={category} onChange={(e) => setCategory(e.target.value)} />
                  </DialogDescription>
                </DialogHeader>
                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddCategory}>Save</DialogClose>
              </DialogContent>

            </Dialog>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {categoryList.map((item)=>(
              <div className="flex justify-between border p-1 items-center rounded-md" key={item._id}>
              <div>
                {item.name}
              </div>
              <div className="flex gap-5">
              <Dialog>
              <DialogTrigger onClick={()=>{setCategory(item.name); setOldCategory(item.name)}}><MdEdit/></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Industry</DialogTitle>
                  <DialogDescription>
                    <Input type="text" placeholder="Industry Name" value={category} onChange={(e) => setCategory(e.target.value)} />
                  </DialogDescription>
                </DialogHeader>
                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditCategory(item._id)}>Save</DialogClose>
              </DialogContent>

            </Dialog>



                <Dialog>
              <DialogTrigger><MdDelete/></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteCategory(item._id)}>Yes</DialogClose>
                </div>

              </DialogContent>

            </Dialog>

              </div>
            </div>
            ))}
            
          </div>
        </div>




      <div className="h-full w-full p-2 border-2 border-gray-300 rounded-md overflow-y-auto">
        <div className="flex justify-between border-b-2 pb-2">
          <Label className="text-sm font-bold">Blogs</Label>
          <Button onClick={()=>router.push("/admin/blogs/add")}>Add Blog</Button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {blogList.map((item)=>(
            <div className="flex justify-between border p-1 items-center rounded-md" key={item._id}>
            <div>
              <div className="flex gap-2 items-center">
                <Image src={item.image} alt={item.title} width={50} height={50}/>
                {item.title}
              </div>
            </div>
            <div className="flex gap-5">
              <MdEdit onClick={()=>router.push(`/admin/blogs/edit/${item._id}`)}/>
              
              <Dialog>
              <DialogTrigger><MdDelete/></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteBlog(item._id)}>Yes</DialogClose>
                </div>

              </DialogContent>

            </Dialog>
            </div>
          </div>
          ))}
                      
          
        </div>
      </div>
    </div>
  );
}

