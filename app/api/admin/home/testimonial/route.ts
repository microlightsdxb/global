import connectDB from "@/lib/mongodb";
import Home from "@/models/Home";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB();
        const home = await Home.findOne({})
        if(home){
            return NextResponse.json({ data: home.testimonials }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error fetching testimonials" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching testimonials", error);
        return NextResponse.json({ message: "Error fetching testimonials" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const { name, company, image, content } = await request.json();
        const home = await Home.findOne({})
        if(home){
            home.testimonials.push({ name, company, image, content });
            await home.save();
            return NextResponse.json({ message: "Testimonial added successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error adding testimonial" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error adding testimonial", error);
        return NextResponse.json({ message: "Error adding testimonial" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        await connectDB();
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const { name, company, image, content } = await request.json();
        const home = await Home.findOne({})
        if(home){
            const editedTestimonial = home.testimonials.find((item:{_id:string})=>item._id==id)
            if(editedTestimonial){
                editedTestimonial.name = name
                editedTestimonial.company = company
                editedTestimonial.image = image
                editedTestimonial.content = content
                await home.save();
                return NextResponse.json({ message: "Testimonial updated successfully" }, { status: 200 });
            }
        }else{
            return NextResponse.json({ message: "Error updating testimonial" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error updating testimonial", error);
        return NextResponse.json({ message: "Error updating testimonial" }, { status: 500 });
    }
}



export async function DELETE(request: Request){
    try {
        await connectDB();
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const home = await Home.findOne({})
        if(home){
            const deletedTestimonial = home.testimonials.findIndex((item:{_id:string})=>item._id==id)
            if(deletedTestimonial!==-1){
                home.testimonials.splice(deletedTestimonial,1)
                await home.save();
                return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
            }
        }else{
            return NextResponse.json({ message: "Error deleting testimonial" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error deleting testimonial", error);
        return NextResponse.json({ message: "Error deleting testimonial" }, { status: 500 });
    }
}


