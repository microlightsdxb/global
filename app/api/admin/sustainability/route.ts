import connectDB from "@/lib/mongodb";
import Sustainability from "@/models/Sustainability";
import {NextResponse } from "next/server";

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