import connectDB from "@/lib/mongodb";
import Team from "@/models/Team";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { name, designation, image, imageAlt } = await request.json();
        const team = await Team.findOne({});
        if(!team){
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }
        team.members.push({ name, designation, image, imageAlt });
        await team.save();
        return NextResponse.json({ message: "Member added successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error adding member", error);
        return NextResponse.json({ message: "Error adding member" }, { status: 500 });
    }
    
}

export async function GET() {
    try {
        await connectDB();
        const team = await Team.findOne({});
        if(!team){
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }
        return NextResponse.json({ data: team.members }, { status: 200 });
    } catch (error) {
        console.log("Error fetching members", error);
        return NextResponse.json({ message: "Error fetching members" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const { name, designation, image, imageAlt } = await request.json();
        console.log(id, name, designation, image, imageAlt);
        const team = await Team.findOne({});
        if(!team){
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }
        const member = team.members.find((member: {_id:string}) => member._id == id);
        if(!member){
            return NextResponse.json({ message: "Member not found" }, { status: 404 });
        }
        member.name = name;
        member.designation = designation;
        member.image = image;
        member.imageAlt = imageAlt;
        await team.save();
        return NextResponse.json({ message: "Member updated successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error updating member", error);
        return NextResponse.json({ message: "Error updating member" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const team = await Team.findOne({});
        if(!team){
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }
        team.members = team.members.filter((member: {_id:string}) => member._id != id);
        await team.save();
        return NextResponse.json({ message: "Member deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error deleting member", error);
        return NextResponse.json({ message: "Error deleting member" }, { status: 500 });
    }
}


