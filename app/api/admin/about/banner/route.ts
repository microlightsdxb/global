import connectDB from "@/lib/mongodb";
import About from "@/models/About";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const formData = await request.formData();
        const banner = formData.get("banner");
        const about = await About.findOne({});
        if(about){
            about.banner = banner;
            await about.save();
            return NextResponse.json({ message: "Banner uploaded successfully" }, { status: 200 });
        }
    } catch (error) {
        console.error("Error uploading banner:", error);
        return NextResponse.json({ message: "Failed to upload banner" }, { status: 500 });
    }
}
