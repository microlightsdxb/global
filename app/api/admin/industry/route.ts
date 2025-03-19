import Industry from "@/models/Industry";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET(req:NextRequest) {
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
    try {
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const { name } = await req.json();
        const industry = await Industry.findByIdAndUpdate(id, { name }, { new: true });
        if(industry){
            return NextResponse.json({ message: "Industry updated successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error updating industry" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error updating industry" }, { status: 500 });
    }
}

export async function DELETE(req:NextRequest) {
    try {
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const industry = await Industry.findByIdAndDelete(id);
        if(industry){
            return NextResponse.json({ message: "Industry deleted successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error deleted industry" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error deleted industry" }, { status: 500 });
    }
}
