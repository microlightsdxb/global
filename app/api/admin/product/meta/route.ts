import ProductMeta from "@/models/ProductMeta";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";
import connectDB from "@/lib/mongodb";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { metaTitle, metaDescription } = await request.json();
        const productMeta = await ProductMeta.findOne({});
        if(!productMeta){
            return NextResponse.json({ message: "Product meta not found" }, { status: 404 });
        }
        productMeta.metaTitle = metaTitle;
        productMeta.metaDescription = metaDescription;
        await productMeta.save();
        return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving details", error);
        return NextResponse.json({ message: "Failed to save details" }, { status: 500 });
    }
}

export async function GET(){
    try {
        await connectDB();
        const productMeta = await ProductMeta.findOne({});
        if(!productMeta){
            return NextResponse.json({ message: "Product meta not found" }, { status: 404 });
        }
        return NextResponse.json({ metaTitle: productMeta.metaTitle, metaDescription: productMeta.metaDescription }, { status: 200 });
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ message: "Error fetching details" }, { status: 500 });
    }
}