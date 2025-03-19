import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const {name,client,industry,scope,location,description} = await req.json();
        const project = await Project.create({name,client,industry,scope,location,description});
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
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const {name,client,industry,scope,location,description} = await req.json();
        const project = await Project.findByIdAndUpdate(id,{name,client,industry,scope,location,description});
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
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if(id){
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
