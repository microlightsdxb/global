import Industry from "@/models/Industry";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import mongoose from "mongoose";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
    try {
        await connectDB();
        const industry = await Industry.find();
        if(industry){
            return NextResponse.json({ success: true, data: industry }, { status: 200 });
        }else{
            return NextResponse.json({ success: false, message: "Error fetching industry" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Error fetching industry" }, { status: 500 });
    }
}

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { name } = await req.json();
        const industry = await Industry.create({ name });
        if(industry){
            return NextResponse.json({ message: "Industry added successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error adding industry" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error adding industry" }, { status: 500 });
    }
}

export async function PATCH(req:NextRequest) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        session.startTransaction();
        const { name,oldName } = await req.json();
        const projects = await Project.find();
        projects.map(async (project) => {
            if(project.industry === oldName){
                await Project.findByIdAndUpdate(project._id, { industry: name }, { new: true });
            }
        });
        const industry = await Industry.findByIdAndUpdate(id, { name,oldName }, { new: true });
        if(industry){
            await session.commitTransaction();
            return NextResponse.json({ message: "Industry updated successfully" }, { status: 200 });
        }else{
            await session.abortTransaction();
            return NextResponse.json({ message: "Error updating industry" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return NextResponse.json({ message: "Error updating industry" }, { status: 500 });
    }finally{
        await session.endSession();
    }
}

export async function DELETE(req:NextRequest) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        session.startTransaction();
        const deletedIndustry = await Industry.findById(id);
        if(deletedIndustry){
            const projects = await Project.find();
            projects.map(async (project) => {
                if(project.industry === deletedIndustry.name){
                    await Project.findByIdAndUpdate(project._id, { industry: "" }, { new: true });
                }
            });
        }
        const industry = await Industry.findByIdAndDelete(id);
        if(industry){
            await session.commitTransaction();
            return NextResponse.json({ message: "Industry deleted successfully" }, { status: 200 });
        }else{
            await session.abortTransaction();
            return NextResponse.json({ message: "Error deleted industry" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return NextResponse.json({ message: "Error deleted industry" }, { status: 500 });
    }finally{
        await session.endSession();
    }
}
