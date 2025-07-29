"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { TbReorder } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import {closestCorners, DndContext, DragEndEvent} from '@dnd-kit/core'
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import ProductCard from './ProductCard'

const ProductListing = () => {
    const [products, setProducts] = useState<{ _id: string, name: string, thumbnail: string }[]>([]);
    const [refetch, setRefetch] = useState(false);
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [reorderMode, setReorderMode] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/admin/product")
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.data)
                } else {
                    console.log("Error in fetching products")
                }
            } catch (error) {
                console.log("Error in fetching products", error)
            }
        }
        fetchProducts()
    }, [refetch])

    const handleDeleteProduct = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/product?id=${id}`, {
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
            console.log("Error in deleting product", error)
        }
    }

    const submitMetaSection = async () => {
        try {
            const response = await fetch("/api/admin/product/meta", {
                method: "POST",
                body: JSON.stringify({ metaTitle, metaDescription }),
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

    const fetchMeta = async () => {
        try {
            const response = await fetch("/api/admin/product/meta");
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setMetaTitle(data.metaTitle);
                    setMetaDescription(data.metaDescription);
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching meta section", error);
        }
    }

    const confirmPosition = async () => {
        setReorderMode(!reorderMode);

        const updatedProductList = products.map((product, index) => ({
            ...product,
            index: index + 1,
        }));

        setProducts(updatedProductList);

        const formData = new FormData()
        formData.append('productList', JSON.stringify(updatedProductList))
        const response = await fetch(`/api/admin/product/reorder`, {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            const data = await response.json()
            if (data.success) {
                alert(data.message)
            } else {
                alert(data.message)
            }
        }
    };


    const getTaskPos = (id: number | string) => products.findIndex((item:{_id:string})=>( item._id == id))
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
      
        if (!over || active.id === over.id) return;
      
        setProducts((products: { _id: string; name: string,thumbnail:string }[]) => {
          const originalPos = getTaskPos(active.id);
          const newPos = getTaskPos(over.id);
          return arrayMove(products, originalPos, newPos);
        });
      };



    useEffect(() => {
        fetchMeta();
    }, []);

    return (
        <div className='flex flex-col gap-5'>

            <div className="h-fit w-full p-5 border-gray-300 shadow-md rounded-md mt-5 bg-white">
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">Meta Section</Label>
                    <Button onClick={submitMetaSection}>Save</Button>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                    <div className='flex flex-col gap-1'>
                        <Label>Meta title</Label>
                        <Input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label>Meta Description</Label>
                        <Input type="text" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="h-fit w-full p-5 border-gray-300 shadow-md rounded-md mt-5 bg-white">
                <div className='flex justify-between'>
                    <h1 className='text-md font-bold'>Products</h1>
                    <div className='flex gap-5'>
                        <Link href={"/admin/products/add"}><Button>Add Product</Button></Link>
                        <Button
                            className="h-9"
                            onClick={() => {
                                if (!reorderMode) {
                                    setReorderMode(true);
                                } else {
                                    confirmPosition();
                                }
                            }}
                        >
                            {!reorderMode ? <TbReorder /> : <GiConfirmed />}
                        </Button>
                    </div>
                </div>
                <div className='flex flex-col gap-2 overflow-y-auto h-screen mt-5 p-2'>
                    {!reorderMode && products.map((product, index) => (
                        <div key={index} className='flex justify-between border p-3 rounded-md items-center h-24 shadow-md hover:shadow-lg transition-all duration-300'>
                            <div className='flex gap-5 items-center h-24'>
                                <div className='h-full w-24 relative'>
                                    <Image src={product.thumbnail} alt={product.name} width={100} height={100} className='h-full w-full object-cover absolute top-0 left-0' />
                                </div>
                                <div className='text-[16px]'>{product.name}</div>
                            </div>
                            <div className='flex gap-5'>
                                <Link href={`/admin/products/edit/${product._id}`}><MdEdit /></Link>
                                <MdDelete onClick={() => handleDeleteProduct(product._id)} />
                            </div>
                        </div>
                    ))}

                    {reorderMode &&

                        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                            <SortableContext items={products.map((product) => product._id)} strategy={verticalListSortingStrategy}>
                                {products?.map((product, index) => (
                                    <ProductCard key={index} product={product} id={product._id} />
                                ))}
                            </SortableContext>
                        </DndContext>

                    }

                </div>
            </div>
        </div>
    )
}

export default ProductListing