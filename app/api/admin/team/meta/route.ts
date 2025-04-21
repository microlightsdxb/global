import { NextResponse } from "next/server";

import TeamMeta from "@/models/TeamMeta";
import connectDB from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        await connectDB()
        const { metaTitle, metaDescription } = await request.json();
        const teamMeta = await TeamMeta.findOne({});
        if(!teamMeta){
            return NextResponse.json({ message: "Team meta not found" }, { status: 404 });
        }
        teamMeta.metaTitle = metaTitle;
        teamMeta.metaDescription = metaDescription;
        await teamMeta.save();
        return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Failed to save details" }, { status: 500 });
    }
}

export async function GET(){
    try {
        await connectDB()
        const teamMeta = await TeamMeta.findOne({});
        if(!teamMeta){
            return NextResponse.json({ message: "Team meta not found" }, { status: 404 });
        }
        return NextResponse.json({ teamMeta }, { status: 200 });
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ message: "Failed to fetch details" }, { status: 500 });
    }
}