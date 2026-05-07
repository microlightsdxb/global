import connectDB from "@/lib/mongodb";
import BlogMeta from "@/models/BlogMeta";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
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
