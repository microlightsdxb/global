import Sustainability from "@/models/Sustainability";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";
import connectDB from "@/lib/mongodb";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { metaTitle, metaDescription } = await request.json();
        const sustainability = await Sustainability.findOne({});
        if(!sustainability){
            return NextResponse.json({ message: "Sustainability meta not found" }, { status: 404 });
        }
        sustainability.metaTitle = metaTitle;
        sustainability.metaDescription = metaDescription;
        await sustainability.save();
        return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Failed to save details" }, { status: 500 });
    }
}


