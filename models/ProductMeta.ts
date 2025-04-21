import mongoose from "mongoose";

const productMetaSchema = new mongoose.Schema({
    metaTitle: String,
    metaDescription: String
})

export default mongoose.models.ProductMeta || mongoose.model("ProductMeta",productMetaSchema);
