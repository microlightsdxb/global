import connectDB from "@/lib/mongodb";
import About from "@/models/About";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const formData = await request.formData();
        const missionDescription = formData.get("missionDescription");
        const visionDescription = formData.get("visionDescription");
        const valuesDescription = formData.get("valuesDescription");
        const missionIcon = formData.get("missionIcon");
        const visionIcon = formData.get("visionIcon");
        const valuesIcon = formData.get("valuesIcon");
        const missionAltTag = formData.get("missionAltTag");
        const visionAltTag = formData.get("visionAltTag");
        const valuesAltTag = formData.get("valuesAltTag");
        const secondSectionImage = formData.get("secondSectionImage");
        const sectionTwoImageAltTag = formData.get("sectionTwoImageAltTag");
        const about = await About.findOne({});
        if(!about){
            return NextResponse.json({ message: "About not found" }, { status: 404 });
        }
        about.mission.description = missionDescription;
        about.mission.icon = missionIcon;
        about.mission.altTag = missionAltTag;
        about.vision.description = visionDescription;
        about.vision.icon = visionIcon;
        about.vision.altTag = visionAltTag;
        about.values.description = valuesDescription;
        about.values.icon = valuesIcon;
        about.values.altTag = valuesAltTag;
        about.sectionTwoImage = secondSectionImage;
        about.sectionTwoImageAltTag = sectionTwoImageAltTag;
        await about.save();
        return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
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
        return NextResponse.json({ data: about }, { status: 200 });
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ message: "Error fetching details" }, { status: 500 });
    }
}
