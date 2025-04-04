import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    introTitle: String,
    introDescription: String,
    introImage: String,
    sectionTwoImage: String,
    mission:{
        description: String,
        icon: String,
    },
    vision:{
        description: String,
        icon: String,
    },
    values:{
        description: String,
        icon: String,
    },
    whyItems:[
        {
            title: String,
            description: String,
            icon: String,
            bottomIcon: String,
        }
    ],    
});

const About = mongoose.models.About || mongoose.model("About", aboutSchema);

export default About;
