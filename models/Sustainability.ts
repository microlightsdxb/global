import mongoose from "mongoose";

const sustainabilitySchema = new mongoose.Schema({
    introTitle:{
        type:String,
        required:true
    },
    introDescription:{
        type:String,
        required:true
    },
    introImage:{
        type:String,
        required:true
    },
    introImageAlt:{
        type:String,
        default:""
    },
    sectionTwoTitle:{
        type:String,
    },
    sectionTwoDescription:{
        type:String,
    },
    practices:[
        {
            title:String,
            description:String,
            icon:String,
            iconAlt:String
        }
    ],
    certifications:[
        {
            title:String,
            description:String,
            images:[String]
        }
    ],
    goals:{
        title:String,
        description:String,
        items:[
            {
                title:String,
                description:String,
                image:String,
                iconAlt:String,
                icon:String
            }
        ]
    },
    outroTitle:{
        type:String
    },
    outroDescription:{
        type:String
    },
    metaTitle:{
        type:String
    },
    metaDescription:{
        type:String
    }
})

const Sustainability = mongoose.models.Sustainability|| mongoose.model("Sustainability",sustainabilitySchema)

export default Sustainability;