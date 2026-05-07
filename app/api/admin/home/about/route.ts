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
        const formData = await request.formData()
        const title = formData.get("title");
        const description = formData.get("description");
        const image = formData.get("image");
        const years = formData.get("years");
        const projects = formData.get("projects");
        const clients = formData.get("clients");
        const aboutImageAltTag = formData.get("aboutImageAltTag");
        const home = await Home.findOne({});
        if (home) {
            home.aboutTitle = title;
            home.aboutDescription = description;
            home.aboutImage = image;
            home.years = years;
            home.projects = projects;
            home.clients = clients;
            home.aboutImageAltTag = aboutImageAltTag;
            await home.save();
            return NextResponse.json({ message: "About section updated successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Error updating about section" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error updating about section", error);
        return NextResponse.json({ message: "Error updating about section" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const home = await Home.findOne({});
        if(home){
            return NextResponse.json({ data: home }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Error fetching about section" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching about section", error);
        return NextResponse.json({ message: "Error fetching about section" }, { status: 500 });
    }
}



