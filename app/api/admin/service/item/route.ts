import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function PATCH(request: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {introTitle, introDescription, introImage,introImageAlt,pageBanner,bannerAlt,type,items,metaTitle,metaDescription} = await request.json();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const service = await Service.findById(id);
        console.log("items",items)
        if (!service) {
            return NextResponse.json({ message: "Editing service failed" }, { status: 400 });
        }
        service.introTitle = introTitle;
        service.introDescription = introDescription;
        service.introImage = introImage;
        service.introImageAlt = introImageAlt;
        service.pageBanner = pageBanner;
        service.bannerAlt = bannerAlt;
        service.metaTitle = metaTitle;
        service.metaDescription = metaDescription;
        if (!service.method) {
            service.method = { name: type, items }; // set default structure
          } else {
            service.method.name = type;
            service.method.items = items;
          }
        await service.save();
        return NextResponse.json({ message: "Service edited successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error in editing service", error);
        return NextResponse.json({ message: "Editing service failed" }, { status: 400 });
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const service = await Service.findById(id);
        if (!service) {
            return NextResponse.json({ message: "Fetching service failed" }, { status: 400 });
        }
        return NextResponse.json({ message: "Service fetched successfully", data: service }, { status: 200 });
    } catch (error) {
        console.log("Error in fetching service", error);
        return NextResponse.json({ message: "Fetching service failed" }, { status: 400 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {type,itemTitle, itemDescription, itemImage,metaTitle,metaDescription} = await request.json();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const service = await Service.findById(id);
        if (!service) {
            return NextResponse.json({ message: "Adding item failed" }, { status: 400 });
        }
        if (!service.method) {
            service.method.name = type;
        }
        service.method.items.push({ title: itemTitle, description: itemDescription, image: itemImage,metaTitle,metaDescription });
        await service.save();
        return NextResponse.json({ message: "Item added successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error in adding item", error);
        return NextResponse.json({ message: "Adding item failed" }, { status: 400 });
    }
}
