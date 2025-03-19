import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const {title,content,image,category} = await req.json();
        const blog = await Blog.create({title,content,image,category});
        if(blog){
            return NextResponse.json({message: "Blog added successfully"},{status: 200});
        }
        else{
            return NextResponse.json({message: "Error in adding blog"},{status: 500});
        }
    } catch (error) {
        console.log("Error in adding blog",error);
        return NextResponse.json({message: "Error in adding blog"},{status: 500});
    }
}

export async function PATCH(req:NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const {title,content,image,category} = await req.json();
        const blog = await Blog.findByIdAndUpdate(id,{title,content,image,category});
        if(blog){
            return NextResponse.json({message: "Blog updated successfully"},{status: 200});
        }
        else{
            return NextResponse.json({message: "Error in updating blog"},{status: 500});
        }
    } catch (error) {
        console.log("Error in updating blog",error);
        return NextResponse.json({message: "Error in updating blog"},{status: 500});
    }
}

export async function GET(req:NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if(id){
            const blog = await Blog.findById(id);
            if(blog){
                return NextResponse.json({message: "Blog fetched successfully",data: blog},{status: 200});
            }else{
                return NextResponse.json({message: "Error in fetching blog"},{status: 500}); 
            }
        }else{
            const blogs = await Blog.find();
            if(blogs){
                return NextResponse.json({message: "Blogs fetched successfully",data: blogs},{status: 200});
            }
            else{
                return NextResponse.json({message: "Error in fetching blogs"},{status: 500});
            }
        }

    } catch (error) {
        console.log("Error in fetching blogs",error);
        return NextResponse.json({message: "Error in fetching blogs"},{status: 500});
    }
}

export async function DELETE(req:NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if(id){
            const blog = await Blog.findByIdAndDelete(id);
            if(blog){
                return NextResponse.json({message: "blog deleted successfully"},{status: 200});
            }else{
                return NextResponse.json({message: "Error in deleting blog"},{status: 500});
            }
        }else{
            return NextResponse.json({message: "Error in deleting blog"},{status: 500});
        }   
    } catch (error) {
        console.log("Error in deleting blog",error);
        return NextResponse.json({message: "Error in deleting blog"},{status: 500});
    }
}
