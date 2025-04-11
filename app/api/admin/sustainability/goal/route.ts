import connectDB from "@/lib/mongodb";
import Sustainability from "@/models/Sustainability";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const formData = await request.formData();
        const goalsTitle = formData.get("goalsTitle");
        const goalsDescription = formData.get("goalsDescription");
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        sustainablity.goals.title = goalsTitle;
        sustainablity.goals.description = goalsDescription;
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
        return NextResponse.json({ data: sustainablity.goals }, { status: 200 });
    } catch (error) {
        console.log("Error fetching goals section", error);
        return NextResponse.json({ message: "Error fetching goals section" }, { status: 500 });
    }
}


export async function PATCH(request: NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const {goalTitle,goalDescription,goalImage} = await request.json()
        const sustainablity = await Sustainability.findOne({});
        if(!sustainablity){
            return NextResponse.json({ message: "Sustainability not found" }, { status: 404 });
        }
        if(id){
            const editSustainability = sustainablity.goals.items.find((item:{_id:string})=>item._id == id)
            if(editSustainability){
                editSustainability.image = goalImage
                editSustainability.title = goalTitle
                editSustainability.description = goalDescription
                await sustainablity.save()
                return NextResponse.json({ message: "Item updated successfully" }, { status: 200 });
            }
        }
        sustainablity.goals.items.push({title:goalTitle,description:goalDescription,image:goalImage})
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
            const deleteSustainability = sustainablity.goals.items.filter((item:{_id:string})=>item._id != id)
            if(deleteSustainability){
                sustainablity.goals.items = deleteSustainability
                await sustainablity.save()
                return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
            }
        }
        return NextResponse.json({ message: "Item cannot be found" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Error saving details" }, { status: 500 });
    }
}