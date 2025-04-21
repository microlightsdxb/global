import About from "@/models/About";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const about = await About.findOne({});
        if(about){
            const whyUs = about.whyItems;
            return NextResponse.json({message:"Data fetched successfully",data:whyUs});
        }else{
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
    } catch (error) {
        console.log("Error fetching data", error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
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

export async function PATCH(req: Request) {
    try {
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

export async function DELETE(req: Request) {
    try {
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




