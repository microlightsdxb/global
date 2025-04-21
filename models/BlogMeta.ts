import mongoose from "mongoose";

export const BlogMetaSchema = new mongoose.Schema({
    metaTitle: { type: String },
    metaDescription: { type: String },
});

export default mongoose.models.BlogMeta || mongoose.model("BlogMeta", BlogMetaSchema);
