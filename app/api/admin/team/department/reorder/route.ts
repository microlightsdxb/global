import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Team from "@/models/Team";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const formData = await req.formData();
        const designationList = formData.get('designationList');
        const team = await Team.findOne({});
        if(team){
            team.departments = JSON.parse(designationList as string);
            await team.save();
            return NextResponse.json({ message: "Department reordered successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error reordering department" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error reordering department" }, { status: 500 });
    }
}