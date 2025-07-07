import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(){
    try {
        await connectDB();
        const contacts = await Contact.find();
        if(contacts){
            return NextResponse.json({success:true,data:contacts},{status:200})
        }else{
            return NextResponse.json({success:false,message:"Error in fetching contact"},{status:500})
        }
    } catch (error) {
        console.log("Error in fetching contact",error);
        return NextResponse.json({message:"Error in fetching contact"},{status:500});
    }
}

export async function POST(request:NextRequest){
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {region} = await request.json();
        console.log("region",region)
        if(region){
            const newRegion = await Contact.create({region});
            if(newRegion){
                console.log("new region created")
                return NextResponse.json({success:true,message:"Region added successfully"},{status:200})
            }else{
                console.log("error in creating region")
                return NextResponse.json({success:false,message:"Error in adding region"},{status:500})
            }
        }else{
            return NextResponse.json({success:false,message:"Region is required"},{status:400})
        }
    } catch (error) {
        console.log("Error in adding region",error);
        return NextResponse.json({message:"Error in adding region"},{status:500});
    }
}

export async function PATCH(request:NextRequest){
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {id,region} = await request.json();
        if(id && region){
            const updatedRegion = await Contact.findByIdAndUpdate(id,{region},{new:true});
            if(updatedRegion){
                return NextResponse.json({success:true,message:"Region updated successfully"},{status:200})
            }else{
                return NextResponse.json({success:false,message:"Error in updating region"},{status:500})
            }
        }else{
            return NextResponse.json({success:false,message:"Id and region are required"},{status:400})
        }
    } catch (error) {
       console.log("Error in editing region",error);
       return NextResponse.json({message:"Error in editing region"},{status:500});
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
            const deletedRegion = await Contact.findByIdAndDelete(id);
            if(deletedRegion){
                return NextResponse.json({success:true,message:"Region deleted successfully"},{status:200})
            }else{
                return NextResponse.json({success:false,message:"Error in deleting region"},{status:500})
            }
        }else{
            return NextResponse.json({success:false,message:"Id is required"},{status:400})
        }
    } catch (error) {
        console.log("Error in deleting region",error);
        return NextResponse.json({message:"Error in deleting region"},{status:500});
    }
}
