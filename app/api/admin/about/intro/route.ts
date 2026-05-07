import connectDB from "@/lib/mongodb";
import About from "@/models/About";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const formData = await request.formData();
        const title = formData.get("title");
        const description = formData.get("description");
        const image = formData.get("image");
        const introImageAltTag = formData.get("introImageAltTag");
        const about = await About.findOne({});
        if(!about){
            return NextResponse.json({ message: "About not found" }, { status: 404 });
        }
        about.introTitle = title;
        about.introDescription = description;
        about.introImage = image;
        about.introImageAltTag = introImageAltTag;
        await about.save();
        return NextResponse.json({ message: "About updated successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Error saving details" }, { status: 500 });
    }
}

export async function GET(){
    try {
        await connectDB();
        const about = await About.findOne({});
        if(!about){
            return NextResponse.json({ message: "About not found" }, { status: 404 });
        }
        return NextResponse.json({ data: about }, { status: 200 });
    } catch (error) {
        console.log("Error fetching intro section", error);
        return NextResponse.json({ message: "Error fetching intro section" }, { status: 500 });
    }
}
