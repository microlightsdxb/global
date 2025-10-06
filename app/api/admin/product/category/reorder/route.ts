import connectDB from "@/lib/mongodb";
import ProductType from "@/models/ProductType";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";
import mongoose from "mongoose";

export async function POST(request:NextRequest){
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const formData = await request.formData();
        const categoryList = JSON.parse(formData.get("categoryList") as string);
        const typeId = formData.get("typeId");
        console.log("categoryList",categoryList)
        if(categoryList && typeId){
            const type = await ProductType.findById(typeId);
            if(type){
                type.category = categoryList;
                await type.save();
                session.commitTransaction()
                return NextResponse.json({success:true,message:"Category reordered successfully"},{status:200})
            }else{
                session.abortTransaction()
                return NextResponse.json({success:false,message:"Type not found"},{status:404})
            }
        }else{
            session.abortTransaction()
            return NextResponse.json({success:false,message:"Category and typeId are required"},{status:400})
        }
    } catch (error) {
        console.log("Error in reordering category",error);
        session.abortTransaction()
        return NextResponse.json({success:false,message:"Error in reordering category"},{status:500})
    }finally{
        session.endSession()
    }
}