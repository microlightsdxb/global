import connectDB from "@/lib/mongodb";
import Sustainability from "@/models/Sustainability";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const {certificationTitle,certificationDescription} = await request.json()
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        sustainablity.certifications.push({title:certificationTitle,description:certificationDescription,images:[]})
        await sustainablity.save();
        return NextResponse.json({ message: "Item added successfully" }, { status: 200 });
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
        return NextResponse.json({ data: sustainablity.certifications }, { status: 200 });
    } catch (error) {
        console.log("Error fetching certifications", error);
        return NextResponse.json({ message: "Error fetching certifications" }, { status: 500 });
    }
}


export async function PATCH(request: NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const {certificationTitle,certificationDescription} = await request.json()
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        if(id){
            const editSustainability = sustainablity.certifications.find((item:{_id:string})=>item._id==id)
            if(editSustainability){
                editSustainability.title = certificationTitle
                editSustainability.description = certificationDescription
                await sustainablity.save();
                return NextResponse.json({ message: "Item updated successfully" }, { status: 200 });
            }
        }
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
            const deleteSustainability = sustainablity.certifications.filter((item:{_id:string})=>item._id != id)
            if(deleteSustainability){
                sustainablity.certifications = deleteSustainability
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