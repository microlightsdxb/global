import connectDB from "@/lib/mongodb";
import Tag from "@/models/Tags";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { headerScript, bodyScript } = body;
        const tag = await Tag.findOne({});
        if(tag){
            tag.headerScript = headerScript;
            tag.bodyScript = bodyScript;
            await tag.save();
            return NextResponse.json({ message: "Tag updated successfully" }, { status: 200 });
        }
    } catch (error) {
        console.log("Error saving tag", error);
        return NextResponse.json({ message: "Failed to save tag" }, { status: 500 });
    }
}


export async function GET(){
    try {
        await connectDB();
        const tag = await Tag.findOne({});
        return NextResponse.json({ tag }, { status: 200 });
    } catch (error) {
        console.log("Error fetching tag", error);
        return NextResponse.json({ message: "Failed to fetch tag" }, { status: 500 });
    }
}