import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({})
      .select("image slug imageAlt category _id title createdAt date")
      .lean();

    return NextResponse.json(
      {
        message: "Blogs fetched successfully",
        data: blogs,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in fetching blogs", error);

    return NextResponse.json(
      {
        message: "Error in fetching blogs",
      },
      { status: 500 },
    );
  }
}
