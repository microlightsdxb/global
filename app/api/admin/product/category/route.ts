import connectDB from "@/lib/mongodb";
import ProductType from "@/models/ProductType";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request:NextRequest){
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {category,typeId} = await request.json();
        if(category && typeId){
            const type = await ProductType.findById(typeId);
            if(type){
                type.category.push({name:category,products:[]});
                await type.save();
                return NextResponse.json({success:true,message:"Category added successfully"},{status:200})
            }else{
                return NextResponse.json({success:false,message:"Type not found"},{status:404})
            }
        }else{
            return NextResponse.json({success:false,message:"Category and typeId are required"},{status:400})
        }
    } catch (error) {
        console.log("Error in adding category",error);
        return NextResponse.json({success:false,message:"Error in adding category"},{status:500})
    }
}

export async function GET(request:Request){
    try {
        await connectDB();
        const {searchParams} = new URL(request.url);
        const typeId = searchParams.get("typeId");
        if(typeId){
            const type = await ProductType.findById(typeId);
            if(type){
                return NextResponse.json({success:true,data:type.category},{status:200})
            }else{
                return NextResponse.json({success:false,message:"Type not found"},{status:404})
            }
        }else{
            return NextResponse.json({success:false,message:"TypeId is required"},{status:400})
        }
    } catch (error) {
        console.log("Error in fetching category",error);
        return NextResponse.json({success:false,message:"Error in fetching category"},{status:500})
    }
}

export async function PATCH(request:NextRequest){
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {id,category,typeId} = await request.json();
        if(id && category && typeId){
            const type = await ProductType.findById(typeId);
            if(type){
                const categoryIndex = type.category.findIndex((item:{_id:string})=>item._id == id);
                if(categoryIndex != -1){
                    type.category[categoryIndex].name = category;
                    await type.save();
                    return NextResponse.json({success:true,message:"Category updated successfully"},{status:200})
                }else{
                    return NextResponse.json({success:false,message:"Category not found"},{status:404})
                }
            }else{
                return NextResponse.json({success:false,message:"Type not found"},{status:404})
            }
        }else{
            return NextResponse.json({success:false,message:"Id, category and typeId are required"},{status:400})
        }
    } catch (error) {
        console.log("Error in editing category",error);
        return NextResponse.json({success:false,message:"Error in editing category"},{status:500})
    }
}

export async function DELETE(request:NextRequest){
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {id,typeId} = await request.json();
        if(id && typeId){
            const type = await ProductType.findById(typeId);
            if(type){
                const categoryIndex = type.category.findIndex((item:{_id:string})=>item._id == id);
                if(categoryIndex != -1){
                    type.category.splice(categoryIndex,1);
                    await type.save();
                    return NextResponse.json({success:true,message:"Category deleted successfully"},{status:200})
                }else{
                    return NextResponse.json({success:false,message:"Category not found"},{status:404})
                }
            }else{
                return NextResponse.json({success:false,message:"Type not found"},{status:404})
            }
        }else{
            return NextResponse.json({success:false,message:"Id and typeId are required"},{status:400})
        }
    } catch (error) {
        console.log("Error in deleting category",error);
        return NextResponse.json({success:false,message:"Error in deleting category"},{status:500})
    }
}
