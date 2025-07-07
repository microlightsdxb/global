import connectDB from "@/lib/mongodb";
import Home from "@/models/Home";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { title, description } = await request.json();
        const home = await Home.findOne({});
        if(!home){
            return NextResponse.json({ message: "Home not found" }, { status: 404 });
        }
        home.metaTitle = title;
        home.metaDescription = description;
        await home.save();
        return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Error saving details" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const home = await Home.findOne({});
        if(!home){
            return NextResponse.json({ message: "Home not found" }, { status: 404 });
        }
        return NextResponse.json({ metaTitle: home.metaTitle, metaDescription: home.metaDescription }, { status: 200 });
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ message: "Error fetching details" }, { status: 500 });
    }
}