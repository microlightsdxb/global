import connectDB from "@/lib/mongodb";
import About from "@/models/About";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
    try {
        
        await connectDB();
        const about = await About.findOne({});
        if(about){
            const whyUs = about.whyItems;
            const whyTitle = about.whyTitle;
            return NextResponse.json({message:"Data fetched successfully",data:{whyUs,whyTitle}});
        }else{
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
    } catch (error) {
        console.log("Error fetching data", error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {title, description,icon,iconAltTag} = await req.json();
        const about = await About.findOne({});
        if(about){
            about.whyItems.push({title, description,icon,iconAltTag});
            await about.save();
            return NextResponse.json({message:"Data added successfully"});
        }else{
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
    }catch(error){
        console.log("Error adding data", error);
        return NextResponse.json({ message: "Error adding data" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const {title, description, icon, iconAltTag} = await req.json();
        const about = await About.findOne({});
        if(about){
            const whyUs = about.whyItems.find((item: { _id: string }) => item._id == id);
            if(whyUs){
                whyUs.title = title;
                whyUs.description = description;
                whyUs.icon = icon;
                whyUs.iconAltTag = iconAltTag;
                await about.save();
                return NextResponse.json({ message: "Data updated successfully" }, { status: 200 });
            }else{
                return NextResponse.json({ message: "No data found" }, { status: 404 });
            }
        }else{
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
    }catch(error){
        console.log("Error updating data", error);
        return NextResponse.json({ message: "Error updating data" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const about = await About.findOne({});
        if(about){
            const whyUs = about.whyItems.filter((item: { _id: string }) => item._id != id);
            if(whyUs){
                about.whyItems = whyUs;
                await about.save();
                return NextResponse.json({message:"Data deleted successfully"});
            }else{
                return NextResponse.json({ message: "No data found" }, { status: 404 });
            }
        }else{
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
    }catch(error){
        console.log("Error deleting data", error);
        return NextResponse.json({ message: "Error deleting data" }, { status: 500 });
    }
}






