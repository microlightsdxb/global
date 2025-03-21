import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        await connectDB();
        const {name,wattage,lumen,type,category,specifications,thumbnail,images,file} = await request.json();
        const product = await Product.create({
            name,
            wattage,
            lumen,
            type,
            category,
            specifications,
            thumbnail,
            images,
            file
        })
        if(product){
            return NextResponse.json({message:"Product added successfully"},{status:200})
        }else{
            return NextResponse.json({message:"Error in adding product"},{status:500})
        }
    } catch (error) {
        console.log("Error in adding product",error)
        return NextResponse.json({message:"Error in adding product"},{status:500})
    }
}

export async function GET(request:NextRequest){
    try {
        await connectDB();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        
        if(id){
            const product = await Product.findById(id);
            if(product){
                return NextResponse.json({data:product},{status:200})
            }else{
                return NextResponse.json({message:"Product not found"},{status:404})
            }
        }else{
            const products = await Product.find();
            if(products){
                return NextResponse.json({data:products},{status:200})
            }else{
                return NextResponse.json({message:"No products found"},{status:404})
            }
        }      
    } catch (error) {
        console.log("Error in fetching products",error)
        return NextResponse.json({message:"Error in fetching products"},{status:500})
    }
}

export async function PATCH(request:NextRequest){
    try {
        await connectDB();
        const {name,wattage,lumen,type,category,specifications,thumbnail,images,file} = await request.json();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const product = await Product.findByIdAndUpdate(id,{name,wattage,lumen,type,category,specifications,thumbnail,images,file})
        if(product){
            return NextResponse.json({message:"Product updated successfully"},{status:200})
        }else{
            return NextResponse.json({message:"Error in updating product"},{status:500})
        }
    } catch (error) {
        console.log("Error in updating product",error)
        return NextResponse.json({message:"Error in updating product"},{status:500})
    }
}

export async function DELETE(request:NextRequest){
    try {
        await connectDB();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const product = await Product.findByIdAndDelete(id);
        if(product){
            return NextResponse.json({message:"Product deleted successfully"},{status:200})
        }else{
            return NextResponse.json({message:"Error in deleting product"},{status:500})
        }
    } catch (error) {
        console.log("Error in deleting product",error)
        return NextResponse.json({message:"Error in deleting product"},{status:500})
    }
}