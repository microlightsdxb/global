import connectDB from "@/lib/mongodb";
import Sustainability from "@/models/Sustainability";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const {images} = await request.json()
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        if(id){
            const item = sustainablity.certifications.find((item:{_id:string})=>item._id==id)
            if(item){
                item.images = images
                await sustainablity.save()
                return NextResponse.json({ message: "Images added successfully" }, { status: 200 });
            }
        }
        return NextResponse.json({ message: "Adding images failed" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Error saving details" }, { status: 500 });
    }
}