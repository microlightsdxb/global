import connectDB from "@/lib/mongodb";
import About from "@/models/About";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const about = await About.findOne({});
        if(about){
            return NextResponse.json({ message: "About fetched successfully", data: about });
        }else{
            return NextResponse.json({ message: "About not found" }, { status: 404 });
        }
    } catch (error) {
        console.log("Error fetching about", error)
        return NextResponse.json({ message: "Error fetching about" }, { status: 500 });
    }
}
