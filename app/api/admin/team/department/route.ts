import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Team from "@/models/Team";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const designation = await Team.findOne({});
        if(designation){
            return NextResponse.json({ success: true, data: designation.departments }, { status: 200 });
        }else{
            return NextResponse.json({ success: false, message: "Error fetching designation" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Error fetching category" }, { status: 500 });
    }
}


export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { title } = await req.json();
        const team = await Team.findOne({});
        if(team){
            team.departments.push({ title });
            await team.save();
            return NextResponse.json({ message: "Department added successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error adding department" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error adding category" }, { status: 500 });
    }
}

export async function PATCH(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const { title } = await req.json();
        const team = await Team.findOne({});
        if(team){
            const department = team.departments.find((department: {_id:string}) => department._id == id);
            if(department){
                department.title = title;
                await team.save();
                return NextResponse.json({ message: "Department updated successfully" }, { status: 200 });
            }
            return NextResponse.json({ message: "Error updating designation" }, { status: 500 });
        }else{
            return NextResponse.json({ message: "Error updating designation" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error updating designation" }, { status: 500 });
    }
}

export async function DELETE(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const team = await Team.findOne({});
        if(team){
            team.departments = team.departments.filter((department: {_id:string}) => department._id != id);
            await team.save();
            return NextResponse.json({ message: "Department deleted successfully" }, { status: 200 });
        }
        return NextResponse.json({ message: "Error deleting department" }, { status: 500 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error deleting designation" }, { status: 500 });
    }
}

