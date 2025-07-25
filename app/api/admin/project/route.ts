import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {name,slug,client,industry,scope,location,description,images,thumbnail,thumbnailAlt,metaTitle,metaDescription} = await req.json();
        const project = await Project.create({name,slug,client,industry,scope,location,description,images,thumbnail,thumbnailAlt,metaTitle,metaDescription});
        if(project){
            return NextResponse.json({message: "Project added successfully"},{status: 200});
        }
        else{
            return NextResponse.json({message: "Error in adding project"},{status: 500});
        }
    } catch (error) {
        console.log("Error in adding project",error);
        return NextResponse.json({message: "Error in adding project"},{status: 500});
    }
}

export async function PATCH(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const {name,slug,client,industry,scope,location,description,images,thumbnail,thumbnailAlt,metaTitle,metaDescription} = await req.json();
        const project = await Project.findByIdAndUpdate(id,{name,slug,client,industry,scope,location,description,images,thumbnail,thumbnailAlt,metaTitle,metaDescription});
        if(project){
            return NextResponse.json({message: "Project updated successfully"},{status: 200});
        }
        else{
            return NextResponse.json({message: "Error in updating project"},{status: 500});
        }
    } catch (error) {
        console.log("Error in updating project",error);
        return NextResponse.json({message: "Error in updating project"},{status: 500});
    }
}

export async function GET(req:NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const slug = searchParams.get("slug");
        if(slug){
            const project = await Project.findOne({slug});
            if(project){
                return NextResponse.json({message: "Project fetched successfully",data: project},{status: 200});
            }else{
                return NextResponse.json({message: "Error in fetching project"},{status: 500}); 
            }
        }else if(id){
            const project = await Project.findById(id);
            if(project){
                return NextResponse.json({message: "Project fetched successfully",data: project},{status: 200});
            }else{
                return NextResponse.json({message: "Error in fetching project"},{status: 500}); 
            }
        }else{
            const projects = await Project.find();
            if(projects){
                return NextResponse.json({message: "Projects fetched successfully",data: projects},{status: 200});
            }
            else{
                return NextResponse.json({message: "Error in fetching projects"},{status: 500});
            }
        }

    } catch (error) {
        console.log("Error in fetching projects",error);
        return NextResponse.json({message: "Error in fetching projects"},{status: 500});
    }
}

export async function DELETE(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if(id){
            const project = await Project.findByIdAndDelete(id);
            if(project){
                return NextResponse.json({message: "Project deleted successfully"},{status: 200});
            }else{
                return NextResponse.json({message: "Error in deleting project"},{status: 500});
            }
        }else{
            return NextResponse.json({message: "Error in deleting project"},{status: 500});
        }   
    } catch (error) {
        console.log("Error in deleting project",error);
        return NextResponse.json({message: "Error in deleting project"},{status: 500});
    }
}
