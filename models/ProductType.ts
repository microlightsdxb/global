import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema({
    type: { type: String, required: true },
    image: { type: String, required: true },
    hoverImage: { type: String, required: true },
    category:[{
        name:{type:String,required:true},
        products:[{type:mongoose.Schema.Types.ObjectId,ref:"Product",default:[]}],
        index:{type:Number,required:true}
    }]
});

export default mongoose.models.ProductType || mongoose.model("ProductType", productTypeSchema);

