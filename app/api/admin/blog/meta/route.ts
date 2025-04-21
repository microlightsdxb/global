import connectDB from "@/lib/mongodb";
import BlogMeta from "@/models/BlogMeta";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB()
        const { metaTitle, metaDescription } = await request.json();
        const blogMeta = await BlogMeta.findOne({});
        if(!blogMeta){
            return NextResponse.json({ message: "Blog meta not found" }, { status: 404 });
        }
        blogMeta.metaTitle = metaTitle;
        blogMeta.metaDescription = metaDescription;
        await blogMeta.save();
        return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Failed to save details" }, { status: 500 });
    }
}

export async function GET(){
    try {
        await connectDB()
        const blogMeta = await BlogMeta.findOne({});
        if(!blogMeta){
            return NextResponse.json({ message: "Blog meta not found" }, { status: 404 });
        }
        return NextResponse.json({ metaTitle: blogMeta.metaTitle, metaDescription: blogMeta.metaDescription }, { status: 200 });
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ message: "Error fetching details" }, { status: 500 });
    }
}
