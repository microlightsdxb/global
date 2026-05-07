import connectDB from "@/lib/mongodb";
import ContactMeta from "@/models/ContactMeta";
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
        const contactMeta = await ContactMeta.findOne({});
        if(!contactMeta){
            return NextResponse.json({ message: "Contact meta not found" }, { status: 404 });
        }
        contactMeta.metaTitle = metaTitle;
        contactMeta.metaDescription = metaDescription;
        await contactMeta.save();
        return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Failed to save details" }, { status: 500 });
    }
}


export async function GET() {
    try {
        const contactMeta = await ContactMeta.findOne({});
        return NextResponse.json({ data: contactMeta }, { status: 200 });
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ message: "Failed to fetch details" }, { status: 500 });
    }
}