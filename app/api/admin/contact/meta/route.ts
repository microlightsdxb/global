import connectDB from "@/lib/mongodb";
import ContactMeta from "@/models/ContactMeta";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();
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