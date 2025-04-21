import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    banner: String,
    bannerAltTag: String,
    introTitle: String,
    introDescription: String,
    introImage: String,
    introImageAltTag: String,
    sectionTwoImage: String,
    sectionTwoImageAltTag: String,
    mission:{
        description: String,
        icon: String,
        altTag: String,
    },
    vision:{
        description: String,
        icon: String,
        altTag: String,
    },
    values:{
        description: String,
        icon: String,
        altTag: String,
    },
    whyItems:[
        {
            title: String,
            description: String,
            icon: String,
            iconAltTag: String,
            bottomIcon: String,
        }
    ],
    metaTitle: String,
    metaDescription: String  
});

const About = mongoose.models.About || mongoose.model("About", aboutSchema);

export default About;
