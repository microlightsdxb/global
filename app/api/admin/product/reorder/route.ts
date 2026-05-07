import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      await connectDB();
  
      const isAdmin = await verifyAdmin(request);
      if (!isAdmin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const formData = await request.formData();
      const productList = JSON.parse(formData.get("productList") as string);
  
      if (productList?.length) {
        // Prepare bulk update operations
        const bulkOps = productList.map((product: { _id: string; index: number }) => ({
          updateOne: {
            filter: { _id: product._id },
            update: { $set: { index: product.index } },
          },
        }));
  
        await Product.bulkWrite(bulkOps, { session });
  
        await session.commitTransaction();
        return NextResponse.json({
          success: true,
          message: "Products reordered successfully",
        }, { status: 200 });
      } else {
        await session.abortTransaction();
        return NextResponse.json({
          success: false,
          message: "productList is required",
        }, { status: 400 });
      }
    } catch (error) {
      console.error("Error in reordering products", error);
      await session.abortTransaction();
      return NextResponse.json({
        success: false,
        message: "Error in reordering products",
      }, { status: 500 });
    } finally {
      session.endSession();
    }
  }