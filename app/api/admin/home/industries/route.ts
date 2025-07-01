import connectDB from "@/lib/mongodb";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();
        const {industries,title} = await request.json();
        const home = await Home.findOne({});
        
        if (home) {
            home.industries.items = industries;
            home.industries.title = title;
            await home.save();
            return NextResponse.json({ message: "Industries section updated successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Error updating industries section" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error updating industries section", error);
        return NextResponse.json({ message: "Error updating industries section" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const home = await Home.findOne({});
        if(home){
            return NextResponse.json({ data: home }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Error fetching industries section" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching industries section", error);
        return NextResponse.json({ message: "Error fetching industries section" }, { status: 500 });
    }
}



