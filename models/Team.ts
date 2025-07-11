import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    mdName: String,
    mdDesignation: String,
    mdImage: String,
    mdDescription: String,
    mdImageAlt: String,
    departments:[{
        title: String,
        members:[{
            name: String,
            image: String,
            designation: String,
            imageAlt: String
        }]
    }]
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;

