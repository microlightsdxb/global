import ProductMeta from "@/models/ProductMeta";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
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