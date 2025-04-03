import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    mdName: String,
    mdDesignation: String,
    mdImage: String,
    mdDescription: String,
    members:[{
        name: String,
        designation: String,
        image: String,
    }]
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;

