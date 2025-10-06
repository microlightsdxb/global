import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Team from "@/models/Team";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(req:NextRequest) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get("id");
        const team = await Team.findOne({});
        if(!team){
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }
        const department = team.departments.find((department: {_id:string}) => department._id == id);
        if(!department){
            return NextResponse.json({ message: "Department not found" }, { status: 404 });
        }
        return NextResponse.json({ data: department.members }, { status: 200 });
    } catch (error) {
        console.log("Error fetching members", error);
        return NextResponse.json({ message: "Error fetching members" }, { status: 500 });
    }
}

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const body = await req.json();

        const cleanedArray = body.members.map((member:{_id:string})=>member)
        const team = await Team.findOne({});
        if(team){
            const department = team.departments.find((department: {_id:string}) => department._id == id);
            if(department){
                department.members = cleanedArray;
                await team.save();
                return NextResponse.json({ message: "Members updated successfully" }, { status: 200 });
            }
            return NextResponse.json({ message: "Error updating members" }, { status: 500 });
        }else{
            return NextResponse.json({ message: "Error updating department" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error updating members" }, { status: 500 });
    }
}


    