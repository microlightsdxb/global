import connectDB from "@/lib/mongodb";
import ProjectMeta from "@/models/ProjectMeta";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { metaTitle, metaDescription } = await request.json();
        const projectMeta = await ProjectMeta.findOne({});
        if(!projectMeta){
            return NextResponse.json({ message: "Project meta not found" }, { status: 404 });
        }
        projectMeta.metaTitle = metaTitle;
        projectMeta.metaDescription = metaDescription;
        await projectMeta.save();
        return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Failed to save details" }, { status: 500 });
    }
}


export async function GET(){
    try {
        await connectDB()
        const projectMeta = await ProjectMeta.findOne({});
        if(!projectMeta){
            return NextResponse.json({ message: "Project meta not found" }, { status: 404 });
        }
        return NextResponse.json({ projectMeta }, { status: 200 });
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ message: "Failed to fetch details" }, { status: 500 });
    }
}