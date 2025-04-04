import connectDB from "@/lib/mongodb";
import About from "@/models/About";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const formData = await request.formData();
        const title = formData.get("title");
        const description = formData.get("description");
        const image = formData.get("image");
        const about = await About.create({introTitle: title, introDescription: description, introImage: image});
        if(!about){
            return NextResponse.json({ message: "About not found" }, { status: 404 });
        }
        // about.title = title;
        // about.description = description;
        // about.image = image;
        // await about.save();
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
