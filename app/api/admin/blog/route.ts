import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {title,slug,content,image,imageAlt,category,date,metaTitle,metaDescription,bannerImage,bannerImageAlt} = await req.json();
        const blog = await Blog.create({title,slug,content,image,imageAlt,category,date,metaTitle,metaDescription,bannerImage,bannerImageAlt});
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
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const {title,slug,content,image,imageAlt,category,date,metaTitle,metaDescription,bannerImage,bannerImageAlt} = await req.json();
        const blog = await Blog.findByIdAndUpdate(id,{title,slug,content,image,imageAlt,category,date,metaTitle,metaDescription,bannerImage,bannerImageAlt});
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
        await connectDB();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const slug = searchParams.get("slug");
        if(slug){
            const blog = await Blog.findOne({slug});
            if(blog){
                return NextResponse.json({message: "Blog fetched successfully",data: blog},{status: 200});
            }else{
                return NextResponse.json({message: "Error in fetching blog"},{status: 500}); 
            }
        }else if(id){
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
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
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
