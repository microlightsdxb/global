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
        const formData = await request.formData();
        const outroTitle = formData.get("outroTitle");
        const outroDescription = formData.get("outroDescription");
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        sustainablity.outroTitle = outroTitle;
        sustainablity.outroDescription = outroDescription;
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
        console.log("Error fetching outro section", error);
        return NextResponse.json({ message: "Error fetching outro section" }, { status: 500 });
    }
}