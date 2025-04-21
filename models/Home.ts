import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    banners: [{
        title: String,
        subTitle: String,
        image: String,
        bannerAltTag: String
    }],
    aboutTitle:{
        type:String
    },
    aboutDescription:{
        type:String
    },
    aboutImage:{
        type:String
    },
    aboutImageAltTag:{
        type:String
    },
    years:{
        type:Number
    },
    projects:{
        type:Number
    },
    clients:{
        type:Number
    },
    process:[{
        title: String,
    }],
    testimonials:[{
        content: String,
        image: String,
        name: String,
        company: String,
        testimonialImageAltTag: String,
    }],
    metaTitle: String,
    metaDescription: String,
});

export default mongoose.models.Home || mongoose.model("Home", homeSchema);