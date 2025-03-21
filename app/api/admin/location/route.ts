import Location from "@/models/Location";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import Project from "@/models/Project";

export async function GET() {
    try {
        await connectDB();
        const location = await Location.find();
        if(location){
            return NextResponse.json({ success: true, data: location }, { status: 200 });
        }else{
            return NextResponse.json({ success: false, message: "Error fetching location" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Error fetching location" }, { status: 500 });
    }
}

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const { name } = await req.json();
        const location = await Location.create({ name });
        if(location){
            return NextResponse.json({ message: "location added successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error adding location" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error adding location" }, { status: 500 });
    }
}

export async function PATCH(req:NextRequest) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        session.startTransaction();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const { name,oldName } = await req.json();
        const projects = await Project.find();
        projects.map(async (project) => {
            if(project.location === oldName){
                await Project.findByIdAndUpdate(project._id, { location: name }, { new: true });
            }
        });
        const location = await Location.findByIdAndUpdate(id, { name }, { new: true });
        if(location){
            await session.commitTransaction();
            return NextResponse.json({ message: "location updated successfully" }, { status: 200 });
        }else{
            await session.abortTransaction();
            return NextResponse.json({ message: "Error updating location" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return NextResponse.json({ message: "Error updating location" }, { status: 500 });
    }finally{
        await session.endSession();
    }
}

export async function DELETE(req:NextRequest) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        session.startTransaction();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const deletedLocation = await Location.findById(id);
        if(deletedLocation){
            const projects = await Project.find();
            projects.map(async (project) => {
                if(project.location === deletedLocation.name){
                    await Project.findByIdAndUpdate(project._id, { location: "" }, { new: true });
                }
            });
        }
        const location = await Location.findByIdAndDelete(id);
        if(location){
            await session.commitTransaction();
            return NextResponse.json({ message: "location deleted successfully" }, { status: 200 });
        }else{
            await session.abortTransaction();
            return NextResponse.json({ message: "Error deleted location" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return NextResponse.json({ message: "Error deleted location" }, { status: 500 });
    }finally{
        await session.endSession();
    }
}
