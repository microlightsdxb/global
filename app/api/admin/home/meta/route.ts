import Home from "@/models/Home";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
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