import connectDB from "@/lib/mongodb";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const home = await Home.findOne({})
        if(home){
            return NextResponse.json({ data: home }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error fetching home" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching home", error);
        return NextResponse.json({ message: "Error fetching home" }, { status: 500 });
    }
}