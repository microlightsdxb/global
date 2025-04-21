import Sustainability from "@/models/Sustainability";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
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


