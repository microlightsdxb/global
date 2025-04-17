import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB()
        const body = await request.json();
        const { name,slug } = body;
        const service = await Service.create({ name,slug });
        if(!service) {
            return NextResponse.json({message:"Adding service failed"}, {status:400})
        }
        return NextResponse.json({ message: "Service added successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error in adding service", error)
        return NextResponse.json({message:"Adding service failed"}, {status:400})
    }
}

export async function GET(request: NextRequest){
    try {
        await connectDB()
        const {searchParams} = new URL(request.url)
        const slug = searchParams.get("slug")
        
        if(slug){
            const service = await Service.findOne({ slug });
            if(!service) {
                return NextResponse.json({message:"Fetching service failed"}, {status:400})
            }
            return NextResponse.json({ message: "Service fetched successfully", data: service }, { status: 200 });
        }else{
            
        }

        const services = await Service.find();
        if(!services) {
            return NextResponse.json({message:"Fetching services failed"}, {status:400})
        }
        return NextResponse.json({ message: "Services fetched successfully", data: services }, { status: 200 });
    } catch (error) {
        console.log("Error in fetching services", error)
        return NextResponse.json({message:"Fetching services failed"}, {status:400});
    }
}

export async function PATCH(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const { name,slug } = body;
        const service = await Service.findOneAndUpdate({ _id:id }, { name,slug });
        if (!service) {
            return NextResponse.json({ message: "Editing service failed" }, { status: 400 });
        }
        return NextResponse.json({ message: "Service edited successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error in editing service", error);
        return NextResponse.json({ message: "Editing service failed" }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const service = await Service.findOneAndDelete({ _id:id });
        if (!service) {
            return NextResponse.json({ message: "Deleting service failed" }, { status: 400 });
        }
        return NextResponse.json({ message: "Service deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error in deleting service", error);
        return NextResponse.json({ message: "Deleting service failed" }, { status: 400 });
    }
}
