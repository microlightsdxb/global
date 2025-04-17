import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    banners: [{
        title: String,
        subTitle: String,
        image: String
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
        company: String
    }]
});

export default mongoose.models.Home || mongoose.model("Home", homeSchema);