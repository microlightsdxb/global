import mongoose from "mongoose";

const ContactMetaSchema = new mongoose.Schema({
    metaTitle: String,
    metaDescription: String,
});

export default mongoose.models.ContactMeta || mongoose.model("ContactMeta", ContactMetaSchema);
