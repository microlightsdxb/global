import mongoose from "mongoose";

const teamMetaSchema = new mongoose.Schema({
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
});

export default mongoose.models.TeamMeta || mongoose.model("TeamMeta", teamMetaSchema);
