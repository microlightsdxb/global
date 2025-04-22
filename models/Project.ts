import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug:{
        type:String,
        required:true
    },
    client: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    scope: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    thumbnailAlt: {
        type: String,
        default: "",
    },
    images: {
        type: [String],
        default: [],
    },
    description: {
        type: String,
        required: true,
    },
    metaTitle:{
        type:String
    },
    metaDescription:{
        type:String
    }
});


export default mongoose.models.Project || mongoose.model("Project", projectSchema);
