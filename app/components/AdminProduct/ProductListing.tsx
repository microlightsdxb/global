"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ProductListing = () => {
    const [products,setProducts] = useState<{_id:string,name:string,thumbnail:string}[]>([]);
    const [refetch,setRefetch] = useState(false);

    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/admin/product")
                if(response.ok){
                    const data = await response.json();
                    setProducts(data.data)
                }else{
                    console.log("Error in fetching products")
                }
            } catch (error) {
                console.log("Error in fetching products",error)
            }
        }
        fetchProducts()
    },[refetch])

    const handleDeleteProduct = async (id:string) => {
        try {
            const response = await fetch(`/api/admin/product?id=${id}`,{
                method:"DELETE"
            })
            if(response.ok){
                const data = await response.json();
                alert(data.message)
                setRefetch(!refetch)
            }else{
                const data = await response.json();
                alert(data.message)
            }
        } catch (error) {
            console.log("Error in deleting product",error)
        }
    }
    
  return (
    <div className='flex flex-col gap-5'>
        <div className='flex justify-between'>
            <h1 className='text-md font-bold'>Products</h1>
            <Link href={"/admin/products/add"}><Button>Add Product</Button></Link>
        </div>
        <div className='flex flex-col gap-2'>
            {products.map((product,index)=>(
                <div key={index} className='flex justify-between border p-2 rounded-md items-center'>
                    <div className='flex gap-5 items-center'>
                        <Image src={product.thumbnail} alt={product.name} width={100} height={100} />
                    <div>{product.name}</div>
                </div>
                <div className='flex gap-5'>
                    <Link href={`/admin/products/edit/${product._id}`}><MdEdit/></Link>
                    <MdDelete onClick={()=>handleDeleteProduct(product._id)}/>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProductListing