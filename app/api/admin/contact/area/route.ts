import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request:NextRequest){
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {name,type,address,telephone,mobile,email,mapIframe,regionId} = await request.json();
        
            const region = await Contact.findById(regionId);
            if(region){
                region.area.push({name:name,type:type,address:address,telephone:telephone,mobile:mobile,email:email,mapIframe:mapIframe});
                await region.save();
                return NextResponse.json({success:true,message:"Area added successfully"},{status:200})
            }else{
                return NextResponse.json({success:false,message:"Region not found"},{status:404})
            }

    } catch (error) {
        console.log("Error in adding area",error);
        return NextResponse.json({success:false,message:"Error in adding area"},{status:500})
    }
}

export async function GET(request:NextRequest){
    try {
        await connectDB();
        const {searchParams} = new URL(request.url);
        const regionId = searchParams.get("regionId");
        if(regionId){
            const region = await Contact.findById(regionId);
            if(region){
                return NextResponse.json({success:true,data:region.area},{status:200})
            }else{
                return NextResponse.json({success:false,message:"Region not found"},{status:404})
            }
        }else{
            return NextResponse.json({success:false,message:"RegionId is required"},{status:400})
        }
    } catch (error) {
        console.log("Error in fetching area",error);
        return NextResponse.json({success:false,message:"Error in fetching area"},{status:500})
    }
}

export async function PATCH(request:NextRequest){
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {id,name,type,address,telephone,mobile,email,mapIframe,regionId} = await request.json();
        
            const region = await Contact.findById(regionId);
            if(region){
                const areaIndex = region.area.findIndex((item:{_id:string})=>item._id == id);
                if(areaIndex != -1){
                    region.area[areaIndex].name = name;
                    region.area[areaIndex].type = type;
                    region.area[areaIndex].address = address;
                    region.area[areaIndex].telephone = telephone;
                    region.area[areaIndex].mobile = mobile;
                    region.area[areaIndex].email = email;
                    region.area[areaIndex].mapIframe = mapIframe;
                    await region.save();
                    return NextResponse.json({success:true,message:"Area updated successfully"},{status:200})
                }else{
                    return NextResponse.json({success:false,message:"Area not found"},{status:404})
                }
            }else{
                return NextResponse.json({success:false,message:"Region not found"},{status:404})
            }

    } catch (error) {
        console.log("Error in editing area",error);
        return NextResponse.json({success:false,message:"Error in editing area"},{status:500})
    }
}

export async function DELETE(request:NextRequest){
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {id,regionId} = await request.json();
        if(id && regionId){
            const region = await Contact.findById(regionId);
            if(region){
                const areaIndex = region.area.findIndex((item:{_id:string})=>item._id == id);
                if(areaIndex != -1){
                    region.area.splice(areaIndex,1);
                    await region.save();
                    return NextResponse.json({success:true,message:"Area deleted successfully"},{status:200})
                }else{
                    return NextResponse.json({success:false,message:"Area not found"},{status:404})
                }
            }else{
                return NextResponse.json({success:false,message:"Region not found"},{status:404})
            }
        }else{
            return NextResponse.json({success:false,message:"Id and regionId are required"},{status:400})
        }
    } catch (error) {
        console.log("Error in deleting area",error);
        return NextResponse.json({success:false,message:"Error in deleting area"},{status:500})
    }
}
