import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    bannerImage: { type: String, required: true },
    bannerImageAlt: { type: String },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    metaTitle: { type: String },
    metaDescription: { type: String },
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);

