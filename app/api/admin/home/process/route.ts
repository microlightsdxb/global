import connectDB from "@/lib/mongodb";
import Home from "@/models/Home";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB();
        const home = await Home.findOne({})
        if(home){
            return NextResponse.json({ data: home.process }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error fetching process" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching process", error);
        return NextResponse.json({ message: "Error fetching banners" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const { title } = await request.json();
        const home = await Home.findOne({})
        if(home){
            home.process.push({ title });
            await home.save();
            return NextResponse.json({ message: "Process added successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error adding process" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error adding process", error);
        return NextResponse.json({ message: "Error adding process" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        await connectDB();
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const { title } = await request.json();
        const home = await Home.findOne({})
        if(home){
            const editedProcess = home.process.find((item:{_id:string})=>item._id==id)
            if(editedProcess){
                editedProcess.title = title
                await home.save();
                return NextResponse.json({ message: "Process updated successfully" }, { status: 200 });
            }
        }else{
            return NextResponse.json({ message: "Error updating process" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error updating process", error);
        return NextResponse.json({ message: "Error updating process" }, { status: 500 });
    }
}



export async function DELETE(request: Request){
    try {
        await connectDB();
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const home = await Home.findOne({})
        if(home){
            const deletedProcess = home.process.findIndex((item:{_id:string})=>item._id==id)
            if(deletedProcess!==-1){
                home.process.splice(deletedProcess,1)
                await home.save();
                return NextResponse.json({ message: "Process deleted successfully" }, { status: 200 });
            }
        }else{
            return NextResponse.json({ message: "Error deleting process" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error deleting process", error);
        return NextResponse.json({ message: "Error deleting process" }, { status: 500 });
    }
}


