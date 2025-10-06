import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductType from "@/models/ProductType";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";
import mongoose from "mongoose";

export async function POST(request:NextRequest){
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {name,slug,wattage,lumen,type,category,specifications,thumbnail,images,file,metaTitle,metaDescription,altTag} = await request.json();
        const product = await Product.create({
            name,
            slug,
            wattage,
            lumen,
            type,
            category,
            specifications,
            thumbnail,
            images,
            file,
            metaTitle,
            metaDescription,
            altTag
        })
        if(product){
            const categoryInCategory = await ProductType.findOne({"category.name":category})
            console.log("categoryInCategory",categoryInCategory)
            if(categoryInCategory){
                const categoryObj = categoryInCategory.category.find((cat:{name:string}) => cat.name === category);
                if(categoryObj){
                    categoryObj.products.push(product._id)
                    await categoryInCategory.save()
                }
            }
            await session.commitTransaction();
            return NextResponse.json({message:"Product added successfully"},{status:200})
        }else{
            await session.abortTransaction();
            return NextResponse.json({message:"Error in adding product"},{status:500})
        }
    } catch (error) {
        await session.abortTransaction();
        console.log("Error in adding product",error)
        return NextResponse.json({message:"Error in adding product"},{status:500})
    }finally{
        await session.endSession();
    }
}

export async function GET(request:NextRequest){
    try {
        await connectDB();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const slug = searchParams.get("slug");
        if(slug){
            const product = await Product.findOne({slug});
            if(product){
                return NextResponse.json({data:product},{status:200})
            }else{
                return NextResponse.json({message:"Product not found"},{status:404})
            }
        }else if(id){
            const product = await Product.findById(id);
            if(product){
                return NextResponse.json({data:product},{status:200})
            }else{
                return NextResponse.json({message:"Product not found"},{status:404})
            }
        }else{
            const products = await Product.find().sort({index:1});
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
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {name,slug,wattage,lumen,type,category,specifications,thumbnail,images,file,metaTitle,metaDescription,altTag} = await request.json();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const product = await Product.findByIdAndUpdate(id,{name,slug,wattage,lumen,type,category,specifications,thumbnail,images,file,metaTitle,metaDescription,altTag})
        if(product){
            const categoryInCategory = await ProductType.findOne({"category.name":category})
            if(categoryInCategory){
                const categoryObj = categoryInCategory.category.find((cat:{name:string}) => cat.name === category);
                if(categoryObj){
                    const productIndex = categoryObj.products.findIndex((item:string) => item === product._id);
                    if(productIndex == -1){
                        categoryObj.products.push(product._id)
                        await categoryInCategory.save()
                    }
                }
            }
            await session.commitTransaction();
            return NextResponse.json({message:"Product updated successfully"},{status:200})
        }else{
            await session.abortTransaction();
            return NextResponse.json({message:"Error in updating product"},{status:500})
        }
    } catch (error) {
        await session.abortTransaction();
        console.log("Error in updating product",error)
        return NextResponse.json({message:"Error in updating product"},{status:500})
    }finally{
        await session.endSession();
    }
}


export async function DELETE(request:NextRequest){
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const product = await Product.findByIdAndDelete(id);
        if(product){
            const categoryInCategory = await ProductType.findOne({"category.name":product.category})
            if(categoryInCategory){
                const categoryObj = categoryInCategory.category.find((cat:{name:string}) => cat.name === product.category);
                if(categoryObj){
                    // Example: remove productId from array
                    categoryObj.products = categoryObj.products.filter((id:string) => id.toString() !== product._id.toString());
                    await categoryInCategory.save()
                }
            }
            await session.commitTransaction();
            return NextResponse.json({message:"Product deleted successfully"},{status:200})
        }else{
            await session.abortTransaction();
            return NextResponse.json({message:"Error in deleting product"},{status:500})
        }
    } catch (error) {
        await session.abortTransaction();
        console.log("Error in deleting product",error)
        return NextResponse.json({message:"Error in deleting product"},{status:500})
    }finally{
        await session.endSession();
    }
}