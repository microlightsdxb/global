import connectDB from "@/lib/mongodb";
import ProductType from "@/models/ProductType";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(){
    try {
        await connectDB();
        const types = await ProductType.find();
        if(types){
            return NextResponse.json({success:true,data:types},{status:200})
        }else{
            return NextResponse.json({success:false,message:"Error in fetching type"},{status:500})
        }
    } catch (error) {
        console.log("Error in fetching type",error);
        return NextResponse.json({message:"Error in fetching type"},{status:500});
    }
}

export async function POST(request:NextRequest){
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {type,image,hoverImage} = await request.json();
        console.log("type",type)
        if(type){
            const newType = await ProductType.create({type,image,hoverImage});
            if(newType){
                console.log("new type created")
                return NextResponse.json({success:true,message:"Type added successfully"},{status:200})
            }else{
                console.log("error in creating type")
                return NextResponse.json({success:false,message:"Error in adding type"},{status:500})
            }
        }else{
            return NextResponse.json({success:false,message:"Type is required"},{status:400})
        }
    } catch (error) {
        console.log("Error in adding type",error);
        return NextResponse.json({message:"Error in adding type"},{status:500});
    }
}

export async function PATCH(request:NextRequest){
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {id,type,image,hoverImage} = await request.json();
        if(id && type){
            const updatedType = await ProductType.findByIdAndUpdate(id,{type,image,hoverImage},{new:true});
            if(updatedType){
                return NextResponse.json({success:true,message:"Type updated successfully"},{status:200})
            }else{
                return NextResponse.json({success:false,message:"Error in updating type"},{status:500})
            }
        }else{
            return NextResponse.json({success:false,message:"Id and type are required"},{status:400})
        }
    } catch (error) {
       console.log("Error in editing type",error);
       return NextResponse.json({message:"Error in editing type"},{status:500});
    }
}

export async function DELETE(request:NextRequest){
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {id} = await request.json();
        if(id){
            const deletedType = await ProductType.findByIdAndDelete(id);
            if(deletedType){
                return NextResponse.json({success:true,message:"Type deleted successfully"},{status:200})
            }else{
                return NextResponse.json({success:false,message:"Error in deleting type"},{status:500})
            }
        }else{
            return NextResponse.json({success:false,message:"Id is required"},{status:400})
        }
    } catch (error) {
        console.log("Error in deleting type",error);
        return NextResponse.json({message:"Error in deleting type"},{status:500});
    }
}
