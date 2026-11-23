"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit, MdOpenInNew, MdSearch, MdClose, MdCalendarToday } from "react-icons/md";
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

type TabKey = "blogs" | "category" | "page";

export default function Blogs() {

  const [activeTab, setActiveTab] = useState<TabKey>("blogs");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState({ blogs: true, category: true });

  const [oldCategory, setOldCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [blogList, setBlogList] = useState<{_id: string, title: string, slug: string, image: string, imageAlt?: string, category?: string, date?: string}[]>([]);
  const [categoryList, setCategoryList] = useState<{_id: string, name: string}[]>([]);
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
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
      console.log("Error fetching blogs", error);
    } finally {
      setLoading((prev) => ({ ...prev, blogs: false }));
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
    } finally {
      setLoading((prev) => ({ ...prev, category: false }));
    }
  }

  const handleFetchMeta = async() => {
    try {
      const response = await fetch("/api/admin/blog/meta");
      if(response.ok) {
        const data = await response.json();
        setMetaTitle(data.metaTitle);
        setMetaDescription(data.metaDescription);
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching meta details", error);
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

  const submitMetaSection = async() => {
    try {
      const response = await fetch("/api/admin/blog/meta",{
        method: "POST",
        body: JSON.stringify({ metaTitle, metaDescription }),
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
        console.log("Error saving meta details", error);
    }
  }

  useEffect(()=>{ 
    handleFetchMeta();
    handleFetchCategory();
    handleFetchBlogs();
  },[])

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: "blogs", label: "Blogs", count: blogList.length },
    { key: "category", label: "Category", count: categoryList.length },
    { key: "page", label: "Page" },
  ];

  const query = search.trim().toLowerCase();
  const filteredBlogs = query
    ? blogList.filter((item) =>
        [item.title, item.category].some((v) => v?.toLowerCase().includes(query))
      )
    : blogList;
  const filteredCategories = query
    ? categoryList.filter((item) => item.name.toLowerCase().includes(query))
    : categoryList;

  const formatDate = (value?: string) => {
    if (!value) return "";
    const d = new Date(value);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const emptyState = (label: string) => (
    <div className="px-4 py-16 text-center text-sm text-gray-400">No {label} yet.</div>
  );
  const emptyFor = (label: string) =>
    query ? <div className="px-4 py-16 text-center text-sm text-gray-400">No {label} match &ldquo;{search}&rdquo;.</div> : emptyState(label);

  const skeleton = (withThumb: boolean) => (
    <div aria-busy="true" aria-label="Loading">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between border-b border-gray-200 px-4 py-3 last:border-b-0">
          <div className="flex items-center gap-4">
            {withThumb && <div className="h-14 w-20 shrink-0 animate-pulse rounded-md bg-gray-200" />}
            <div className="flex flex-col gap-2">
              <div className="h-4 animate-pulse rounded bg-gray-200" style={{ width: `${180 + ((i * 67) % 160)}px` }} />
              {withThumb && (
                <div className="flex gap-1.5">
                  <div className="h-5 w-16 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-5 w-20 animate-pulse rounded-full bg-gray-100" />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {withThumb && <div className="h-8 w-8 animate-pulse rounded-md bg-gray-100" />}
            <div className="h-8 w-8 animate-pulse rounded-md bg-gray-100" />
            <div className="h-8 w-8 animate-pulse rounded-md bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );

  const triggerBtn = "bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-black/85 transition-colors cursor-pointer";
  const rowClass = "group flex justify-between items-center px-4 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors";
  const iconBtn = "p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer";

  const deleteDialog = (onConfirm: () => void) => (
    <Dialog>
      <DialogTrigger className={iconBtn} aria-label="Delete" title="Delete"><MdDelete className="h-[18px] w-[18px]" /></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
          <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={onConfirm}>Yes</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col gap-4">

      {/* Tab bar (stays put; only the list below scrolls) */}
      <div className="shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex rounded-lg bg-white p-1 shadow-sm border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => { setActiveTab(tab.key); setSearch(""); }}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab.key ? "bg-black text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`rounded-full px-2 py-0.5 text-[11px] leading-none ${
                    activeTab === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab !== "page" && (
            <div className="relative ml-auto w-full max-w-[320px]">
              <MdSearch className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${activeTab === "blogs" ? "blogs" : "categories"}...`}
                className="h-10 w-full rounded-md border border-gray-200 bg-white pl-9 pr-9 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 [&::-webkit-search-cancel-button]:hidden"
              />
              {search && (
                <button type="button" aria-label="Clear search" onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-700 cursor-pointer">
                  <MdClose className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {activeTab === "blogs" && (
            <Button onClick={() => router.push("/admin/blogs/add")}>Add Blog</Button>
          )}

          {activeTab === "category" && (
            <Dialog>
              <DialogTrigger className={triggerBtn} onClick={() => setCategory("")}>Add Category</DialogTrigger>
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
          )}

          {activeTab === "page" && <Button onClick={submitMetaSection}>Save</Button>}
        </div>
      </div>

      {/* Panels */}
      <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-sm">

        {activeTab === "blogs" && (
          loading.blogs ? skeleton(true) : filteredBlogs.length === 0 ? emptyFor("blogs") : filteredBlogs.map((item) => (
            <div className={rowClass} key={item._id}>
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                  {item.image ? (
                    <Image src={item.image} alt={item.imageAlt || item.title} fill sizes="80px" className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-wide text-gray-400">No image</div>
                  )}
                </div>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <div className="text-[15px] text-gray-800">{item.title}</div>
                  {(item.category || formatDate(item.date)) && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.category && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[12px] text-gray-600">
                          {item.category}
                        </span>
                      )}
                      {formatDate(item.date) && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-0.5 text-[12px] text-gray-600">
                          <MdCalendarToday className="h-3 w-3 text-gray-400" />{formatDate(item.date)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                {item.slug && (
                  <a href={`/blog-details/${item.slug}`} target="_blank" rel="noopener noreferrer" className={iconBtn} aria-label="View on site" title="View on site">
                    <MdOpenInNew className="h-[18px] w-[18px]" />
                  </a>
                )}
                <button type="button" className={iconBtn} aria-label="Edit" title="Edit" onClick={() => router.push(`/admin/blogs/edit/${item._id}`)}>
                  <MdEdit className="h-[18px] w-[18px]" />
                </button>
                {deleteDialog(() => handleDeleteBlog(item._id))}
              </div>
            </div>
          ))
        )}

        {activeTab === "category" && (
          loading.category ? skeleton(false) : filteredCategories.length === 0 ? emptyFor("categories") : filteredCategories.map((item) => (
            <div className={rowClass} key={item._id}>
              <div className="text-[15px] text-gray-800">{item.name}</div>
              <div className="flex gap-1">
                <Dialog>
                  <DialogTrigger className={iconBtn} aria-label="Edit" title="Edit" onClick={() => { setCategory(item.name); setOldCategory(item.name) }}>
                    <MdEdit className="h-[18px] w-[18px]" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                      <DialogDescription>
                        <Input type="text" placeholder="Category Name" value={category} onChange={(e) => setCategory(e.target.value)} />
                      </DialogDescription>
                    </DialogHeader>
                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditCategory(item._id)}>Save</DialogClose>
                  </DialogContent>
                </Dialog>
                {deleteDialog(() => handleDeleteCategory(item._id))}
              </div>
            </div>
          ))
        )}

        {activeTab === "page" && (
          <div className="p-6 flex flex-col gap-5">
            <div>
              <p className="text-sm font-semibold text-gray-900">Meta Section</p>
              <p className="text-sm text-gray-500">SEO title and description for the Blogs page.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Meta title</Label>
              <Input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Meta Description</Label>
              <Input type="text" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
