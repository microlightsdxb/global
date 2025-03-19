import Location from "@/models/Location";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET(req:NextRequest) {
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
    try {
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const { name } = await req.json();
        const location = await Location.findByIdAndUpdate(id, { name }, { new: true });
        if(location){
            return NextResponse.json({ message: "location updated successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error updating location" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error updating location" }, { status: 500 });
    }
}

export async function DELETE(req:NextRequest) {
    try {
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const location = await Location.findByIdAndDelete(id);
        if(location){
            return NextResponse.json({ message: "location deleted successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error deleted location" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error deleted location" }, { status: 500 });
    }
}
