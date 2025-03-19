import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    image: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        required: true,
    },
});


export default mongoose.models.Project || mongoose.model("Project", projectSchema);
