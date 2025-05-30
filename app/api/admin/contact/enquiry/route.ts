import connectDB from "@/lib/mongodb"
import Enquiry from "@/models/Enquiry"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    try {
        await connectDB()
        const {name,phone,email,message} = await req.json()
        console.log(name,phone,email,message)
        const enquiry = await Enquiry.create({name,phone,email,message})
        if(!enquiry){
            return NextResponse.json({message:"Error sending message"},{status:500})
        }
        return NextResponse.json({message:"Message sent successfully"},{status:200})
    } catch (error) {
        console.log("Error sending message",error)
        return NextResponse.json({message:"Error sending message"},{status:500})
    }
}

export async function GET(){
    try {
        await connectDB()
        const enquiry = await Enquiry.find()
        if(!enquiry){
            return NextResponse.json({message:"No enquiry found"},{status:404})
        }
        return NextResponse.json({data:enquiry},{status:200})
    } catch (error) {
        console.log("Error fetching enquiry",error)
        return NextResponse.json({message:"Error fetching enquiry"},{status:500})
    }
}

export async function DELETE(req:Request){
    try {
        await connectDB()
        const {id} = await req.json()
        const enquiry = await Enquiry.findByIdAndDelete(id)
        if(!enquiry){
            return NextResponse.json({message:"Enquiry not found"},{status:404})
        }
        return NextResponse.json({message:"Enquiry deleted successfully"},{status:200})
    } catch (error) {
        console.log("Error deleting enquiry",error)
        return NextResponse.json({message:"Error deleting enquiry"},{status:500})
    }
}
