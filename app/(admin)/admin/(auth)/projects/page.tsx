"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit, MdOpenInNew, MdSearch, MdClose, MdPlace } from "react-icons/md";
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

type TabKey = "projects" | "location" | "industry" | "page";

export default function Projects() {

  const [activeTab, setActiveTab] = useState<TabKey>("projects");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState({ projects: true, location: true, industry: true });
  const [oldIndustry, setOldIndustry] = useState<string>("");
  const [oldLocation, setOldLocation] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [projectList, setProjectList] = useState<{ _id: string, name: string, slug: string, thumbnail?: string, thumbnailAlt?: string, client: string, industry: string, scope: string, location: string, description: string }[]>([]);
  const [locationList, setLocationList] = useState<{ _id: string, name: string }[]>([]);
  const [industryList, setIndustryList] = useState<{ _id: string, name: string }[]>([]);
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const router = useRouter();

  const handleFetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/project");
      if (response.ok) {
        const data = await response.json();
        setProjectList(data.data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching industry", error);
    } finally {
      setLoading((prev) => ({ ...prev, projects: false }));
    }
  }

  const handleAddIndustry = async () => {
    try {
      const response = await fetch("/api/admin/industry", {
        method: "POST",
        body: JSON.stringify({ name: industry }),
      });
      if (response.ok) {
        const data = await response.json();
        setIndustry("");
        alert(data.message);
        handleFetchIndustry();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding industry", error);
    }
  }

  const handleFetchIndustry = async () => {
    try {
      const response = await fetch("/api/admin/industry");
      if (response.ok) {
        const data = await response.json();
        setIndustryList(data.data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching industry", error);
    } finally {
      setLoading((prev) => ({ ...prev, industry: false }));
    }
  }

  const handleEditIndustry = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/industry?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: industry, oldName: oldIndustry }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchIndustry();
        setOldIndustry("");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error editing industry", error);
    }
  }

  const handleDeleteIndustry = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/industry?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchIndustry();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting industry", error);
    }
  }


  const handleFetchLocation = async () => {
    try {
      const response = await fetch("/api/admin/location");
      if (response.ok) {
        const data = await response.json();
        setLocationList(data.data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching location", error);
    } finally {
      setLoading((prev) => ({ ...prev, location: false }));
    }
  }

  const handleAddLocation = async () => {
    try {
      const response = await fetch("/api/admin/location", {
        method: "POST",
        body: JSON.stringify({ name: location }),
      });
      if (response.ok) {
        const data = await response.json();
        setLocation("");
        alert(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding location", error);
    }
  }

  const handleEditLocation = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/location?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: location, oldName: oldLocation }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchLocation();
        setOldLocation("");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error editing location", error);
    }
  }

  const handleDeleteLocation = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/location?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting location", error);
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/project?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchProjects();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting project", error);
    }
  }

  const handleSaveMeta = async() => {
    try {
      const response = await fetch("/api/admin/project/meta",{
        method: "POST",
        body: JSON.stringify({ metaTitle, metaDescription }),
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error saving meta details", error);
    }
  }

  const fetchMeta = async() => {
    try {
      const response = await fetch("/api/admin/project/meta");
      if(response.ok) {
        const data = await response.json();
        setMetaTitle(data.projectMeta.metaTitle);
        setMetaDescription(data.projectMeta.metaDescription);
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching meta details", error);
    }
  }

  useEffect(() => {
    handleFetchProjects();
    handleFetchIndustry();
    handleFetchLocation();
    fetchMeta();
  }, [])

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: "projects", label: "Projects", count: projectList.length },
    { key: "location", label: "Location", count: locationList.length },
    { key: "industry", label: "Industry", count: industryList.length },
    { key: "page", label: "Page" },
  ];

  const query = search.trim().toLowerCase();
  const byName = <T extends { name: string }>(list: T[]) =>
    query ? list.filter((item) => item.name.toLowerCase().includes(query)) : list;
  const filteredProjects = query
    ? projectList.filter((item) =>
        [item.name, item.location, item.industry].some((v) => v?.toLowerCase().includes(query))
      )
    : projectList;
  const filteredLocations = byName(locationList);
  const filteredIndustries = byName(industryList);

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
                  <div className="h-5 w-14 animate-pulse rounded-full bg-gray-100" />
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

  const emptyState = (label: string) => (
    <div className="px-4 py-16 text-center text-sm text-gray-400">No {label} yet.</div>
  );

  const deleteDialog = (onConfirm: () => void) => (
    <Dialog>
      <DialogTrigger className={iconBtn} aria-label="Delete"><MdDelete className="h-[18px] w-[18px]" /></DialogTrigger>
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
                placeholder={`Search ${activeTab}...`}
                className="h-10 w-full rounded-md border border-gray-200 bg-white pl-9 pr-9 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 [&::-webkit-search-cancel-button]:hidden"
              />
              {search && (
                <button type="button" aria-label="Clear search" onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-700 cursor-pointer">
                  <MdClose className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {activeTab === "projects" && (
            <Button onClick={() => router.push("/admin/projects/add")}>Add Project</Button>
          )}

          {activeTab === "location" && (
            <Dialog>
              <DialogTrigger className={triggerBtn} onClick={() => setLocation("")}>Add Location</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Location</DialogTitle>
                  <DialogDescription>
                    <Input type="text" placeholder="Location Name" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </DialogDescription>
                </DialogHeader>
                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddLocation}>Save</DialogClose>
              </DialogContent>
            </Dialog>
          )}

          {activeTab === "industry" && (
            <Dialog>
              <DialogTrigger className={triggerBtn} onClick={() => setIndustry("")}>Add Industry</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Industry</DialogTitle>
                  <DialogDescription>
                    <Input type="text" placeholder="Industry Name" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                  </DialogDescription>
                </DialogHeader>
                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddIndustry}>Save</DialogClose>
              </DialogContent>
            </Dialog>
          )}

          {activeTab === "page" && <Button onClick={handleSaveMeta}>Save</Button>}
        </div>
      </div>

      {/* Panels */}
      <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-sm">

        {activeTab === "projects" && (
          loading.projects ? skeleton(true) : filteredProjects.length === 0 ? emptyFor("projects") : filteredProjects.map((item) => (
            <div className={rowClass} key={item._id}>
              <div className="flex min-w-0 items-center gap-4">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                {item.thumbnail ? (
                  <Image src={item.thumbnail} alt={item.thumbnailAlt || item.name} fill sizes="80px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-wide text-gray-400">No image</div>
                )}
              </div>
              <div className="flex min-w-0 flex-col gap-1.5">
                <div className="text-[15px] text-gray-800">{item.name}</div>
                {(item.location || item.industry) && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.location && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-[12px] text-gray-600">
                        <MdPlace className="h-3.5 w-3.5 text-gray-400" />{item.location}
                      </span>
                    )}
                    {item.industry && (
                      <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-[12px] text-gray-600">
                        {item.industry}
                      </span>
                    )}
                  </div>
                )}
              </div>
              </div>
              <div className="flex gap-1">
                {item.slug && (
                  <a href={`/projects/${item.slug}`} target="_blank" rel="noopener noreferrer" className={iconBtn} aria-label="View on site" title="View on site">
                    <MdOpenInNew className="h-[18px] w-[18px]" />
                  </a>
                )}
                <button type="button" className={iconBtn} aria-label="Edit" title="Edit" onClick={() => router.push(`/admin/projects/edit/${item._id}`)}>
                  <MdEdit className="h-[18px] w-[18px]" />
                </button>
                {deleteDialog(() => handleDeleteProject(item._id))}
              </div>
            </div>
          ))
        )}

        {activeTab === "location" && (
          loading.location ? skeleton(false) : filteredLocations.length === 0 ? emptyFor("locations") : filteredLocations.map((item) => (
            <div className={rowClass} key={item._id}>
              <div className="text-[15px] text-gray-800">{item.name}</div>
              <div className="flex gap-1">
                <Dialog>
                  <DialogTrigger className={iconBtn} aria-label="Edit" onClick={() => { setLocation(item.name); setOldLocation(item.name) }}>
                    <MdEdit className="h-[18px] w-[18px]" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Location</DialogTitle>
                      <DialogDescription>
                        <Input type="text" placeholder="Location Name" value={location} onChange={(e) => setLocation(e.target.value)} />
                      </DialogDescription>
                    </DialogHeader>
                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditLocation(item._id)}>Save</DialogClose>
                  </DialogContent>
                </Dialog>
                {deleteDialog(() => handleDeleteLocation(item._id))}
              </div>
            </div>
          ))
        )}

        {activeTab === "industry" && (
          loading.industry ? skeleton(false) : filteredIndustries.length === 0 ? emptyFor("industries") : filteredIndustries.map((item) => (
            <div className={rowClass} key={item._id}>
              <div className="text-[15px] text-gray-800">{item.name}</div>
              <div className="flex gap-1">
                <Dialog>
                  <DialogTrigger className={iconBtn} aria-label="Edit" onClick={() => { setIndustry(item.name); setOldIndustry(item.name) }}>
                    <MdEdit className="h-[18px] w-[18px]" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Industry</DialogTitle>
                      <DialogDescription>
                        <Input type="text" placeholder="Industry Name" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                      </DialogDescription>
                    </DialogHeader>
                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditIndustry(item._id)}>Save</DialogClose>
                  </DialogContent>
                </Dialog>
                {deleteDialog(() => handleDeleteIndustry(item._id))}
              </div>
            </div>
          ))
        )}

        {activeTab === "page" && (
          <div className="p-6 flex flex-col gap-5">
            <div>
              <p className="text-sm font-semibold text-gray-900">Meta Section</p>
              <p className="text-sm text-gray-500">SEO title and description for the Projects page.</p>
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
