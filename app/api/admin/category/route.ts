import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import mongoose from "mongoose";
import Category from "@/models/Category";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
    try {
        await connectDB();
        const category = await Category.find();
        if(category){
            return NextResponse.json({ success: true, data: category }, { status: 200 });
        }else{
            return NextResponse.json({ success: false, message: "Error fetching category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Error fetching category" }, { status: 500 });
    }
}

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { name } = await req.json();
        const category = await Category.create({ name });
        if(category){
            return NextResponse.json({ message: "category added successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error adding category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error adding category" }, { status: 500 });
    }
}

export async function PATCH(req:NextRequest) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        session.startTransaction();
        const { name,oldName } = await req.json();
        const blogs = await Blog.find();
        blogs.map(async (blog) => {
            if(blog.category === oldName){
                await Blog.findByIdAndUpdate(blog._id, { category: name }, { new: true });
            }
        });
        const category = await Category.findByIdAndUpdate(id, { name,oldName }, { new: true });
        if(category){
            await session.commitTransaction();
            return NextResponse.json({ message: "Category updated successfully" }, { status: 200 });
        }else{
            await session.abortTransaction();
            return NextResponse.json({ message: "Error updating category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return NextResponse.json({ message: "Error updating category" }, { status: 500 });
    }finally{
        await session.endSession();
    }
}

export async function DELETE(req:NextRequest) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        session.startTransaction();
        const deletedCategory = await Category.findById(id);
        if(deletedCategory){
            const blogs = await Blog.find();
            blogs.map(async (blog) => {
                if(blog.category === deletedCategory.name){
                    await Blog.findByIdAndUpdate(blog._id, { category: "" }, { new: true });
                }
            });
        }
        const category = await Category.findByIdAndDelete(id);
        if(category){
            await session.commitTransaction();
            return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
        }else{
            await session.abortTransaction();
            return NextResponse.json({ message: "Error deleted category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return NextResponse.json({ message: "Error deleted category" }, { status: 500 });
    }finally{
        await session.endSession();
    }
}
