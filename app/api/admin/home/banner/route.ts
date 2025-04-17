import connectDB from "@/lib/mongodb";
import Home from "@/models/Home";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB();
        const home = await Home.findOne({})
        if(home){
            return NextResponse.json({ data: home.banners }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error fetching banners" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching banners", error);
        return NextResponse.json({ message: "Error fetching banners" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const { title, subTitle, image } = await request.json();
        const home = await Home.findOne({})
        if(home){
            home.banners.push({ title, subTitle, image });
            await home.save();
            return NextResponse.json({ message: "Banner added successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error adding banner" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error adding banner", error);
        return NextResponse.json({ message: "Error adding banner" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        await connectDB();
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const { title, subTitle, image } = await request.json();
        const home = await Home.findOne({})
        if(home){
            const editedBanner = home.banners.find((item:{_id:string})=>item._id==id)
            if(editedBanner){
                editedBanner.title = title
                editedBanner.subTitle = subTitle
                editedBanner.image = image
                await home.save();
                return NextResponse.json({ message: "Banner updated successfully" }, { status: 200 });
            }
        }else{
            return NextResponse.json({ message: "Error updating banner" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error adding banner", error);
        return NextResponse.json({ message: "Error updating banner" }, { status: 500 });
    }
}


export async function DELETE(request: Request){
    try {
        await connectDB();
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const home = await Home.findOne({})
        if(home){
            const deletedBanner = home.banners.findIndex((item:{_id:string})=>item._id==id)
            if(deletedBanner!==-1){
                home.banners.splice(deletedBanner,1)
                await home.save();
                return NextResponse.json({ message: "Banner deleted successfully" }, { status: 200 });
            }
        }else{
            return NextResponse.json({ message: "Error deleting banner" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error deleting banner", error);
        return NextResponse.json({ message: "Error deleting banner" }, { status: 500 });
    }
}


