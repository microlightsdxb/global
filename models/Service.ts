import mongoose from "mongoose";

const MethodSchema = new mongoose.Schema({
    name: String,
    items: [
      {
        title: String,
        description: String,
        image: String,
        animImage:String,
        imageAlt: String,
      },
    ],
  });

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pageHeading:{
        type:String
    },
    pageBanner:{
        type:String
    },
    bannerAlt:{
        type:String
    },
    introTitle:{
        type:String
    },
    introDescription:{
        type:String
    },
    introImage:{
        type:String
    },
    introImageAlt:{
        type:String
    },
    method:MethodSchema,
    slug:{
        type:String
    },
    metaTitle:{
        type:String
    },
    metaDescription:{
        type:String
    }
})

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

export default Service;
