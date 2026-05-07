import connectDB from "@/lib/mongodb";
import Team from "@/models/Team";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        await connectDB();
        const team = await Team.findOne({});
        if(team){
            return NextResponse.json({ message: "Details fetched successfully", data: team }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error fetching details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ message: "Error fetching details" }, { status: 500 });
    }
}