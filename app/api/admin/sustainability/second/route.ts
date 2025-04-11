
import connectDB from "@/lib/mongodb";
import Sustainability from "@/models/Sustainability";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const formData = await request.formData();
        const secondSectionTitle = formData.get("secondSectionTitle");
        const secondSectionDescription = formData.get("secondSectionDescription");
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        sustainablity.sectionTwoTitle = secondSectionTitle;
        sustainablity.sectionTwoDescription = secondSectionDescription;
        await sustainablity.save();
        return NextResponse.json({ message: "Sustainability updated successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Error saving details" }, { status: 500 });
    }
}

export async function GET(){
    try {
        await connectDB();
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        return NextResponse.json({ data: sustainablity,practices:sustainablity.practices }, { status: 200 });
    } catch (error) {
        console.log("Error fetching intro section", error);
        return NextResponse.json({ message: "Error fetching intro section" }, { status: 500 });
    }
}


export async function PATCH(request: NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const {icon,title,description} = await request.json()
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        if(id){
            const editSustainability = sustainablity.practices.find((item:{_id:string})=>item._id == id)
            if(editSustainability){
                editSustainability.icon = icon
                editSustainability.title = title
                editSustainability.description = description
                await sustainablity.save()
                return NextResponse.json({ message: "Item updated successfully" }, { status: 200 });
            }
        }
        sustainablity.practices.push({icon,title,description})
        await sustainablity.save();
        return NextResponse.json({ message: "Item added successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Error saving details" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        if(id){
            const deleteSustainability = sustainablity.practices.filter((item:{_id:string})=>item._id != id)
            if(deleteSustainability){
                sustainablity.practices = deleteSustainability
                await sustainablity.save()
                return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
            }
        }
        return NextResponse.json({ message: "Item not found" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Error saving details" }, { status: 500 });
    }
}