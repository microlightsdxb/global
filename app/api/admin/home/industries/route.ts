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



