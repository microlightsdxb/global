import connectDB from "@/lib/mongodb";
import About from "@/models/About";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {title} = await req.json();
        const about = await About.findOne({});
        if(about){
            about.whyTitle = title;
            await about.save();
            return NextResponse.json({message:"Data added successfully"});
        }else{
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
    }catch(error){
        console.log("Error adding data", error);
        return NextResponse.json({ message: "Error adding data" }, { status: 500 });
    }
}