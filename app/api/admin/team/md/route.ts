import connectDB from "@/lib/mongodb";
import Team from "@/models/Team";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const {name:mdName,designation:mdDesignation,image:mdImage,description:mdDescription,mdImageAlt} = await request.json();
        const team = await Team.findOne({});
        if(team){
            team.mdName = mdName;
            team.mdDesignation = mdDesignation;
            team.mdImage = mdImage;
            team.mdDescription = mdDescription;
            team.mdImageAlt = mdImageAlt;
            await team.save();
            return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error saving details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Error saving details" }, { status: 500 });
    }  
}

export async function GET() {
    try {
        await connectDB();
        const team = await Team.findOne({});
        if(team){
            return NextResponse.json({ message: "Details fetched successfully", data: team }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error fetching details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ message: "Error fetching details" }, { status: 500 });
    }
}
