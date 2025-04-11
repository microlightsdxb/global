
import connectDB from "@/lib/mongodb";
import Sustainability from "@/models/Sustainability";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const formData = await request.formData();
        const title = formData.get("title");
        const description = formData.get("description");
        const image = formData.get("image");
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        sustainablity.title = title;
        sustainablity.description = description;
        sustainablity.image = image;
        await sustainablity.save();
        return NextResponse.json({ message: "Sustainability updated successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Error saving details" }, { status: 500 });
    }
}

export async function GET(){
    try {
        await connectDB();
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        return NextResponse.json({ data: sustainablity }, { status: 200 });
    } catch (error) {
        console.log("Error fetching intro section", error);
        return NextResponse.json({ message: "Error fetching intro section" }, { status: 500 });
    }
}
