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
        const banner = formData.get("banner");
        const bannerAltTag = formData.get("bannerAltTag");
        const about = await About.findOne({});
        if(about){
            about.banner = banner;
            about.bannerAltTag = bannerAltTag;
            await about.save();
            return NextResponse.json({ message: "Banner uploaded successfully" }, { status: 200 });
        }
    } catch (error) {
        console.error("Error uploading banner:", error);
        return NextResponse.json({ message: "Failed to upload banner" }, { status: 500 });
    }
}
