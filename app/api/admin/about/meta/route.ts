import connectDB from "@/lib/mongodb";
import About from "@/models/About";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB()
        const formData = await request.formData();
        const metaTitle = formData.get("metaTitle");
        const metaDescription = formData.get("metaDescription");
        const about = await About.findOne({});
        if(!about){
            return NextResponse.json({ message: "About not found" }, { status: 404 });
        }
        about.metaTitle = metaTitle;
        about.metaDescription = metaDescription;
        await about.save();
        return NextResponse.json({ message: "About updated successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Error saving details" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const about = await About.findOne({});
        if(!about){
            return NextResponse.json({ message: "About not found" }, { status: 404 });
        }
        return NextResponse.json({ metaTitle: about.metaTitle, metaDescription: about.metaDescription }, { status: 200 });
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ message: "Error fetching details" }, { status: 500 });
    }
}
