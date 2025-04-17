import mongoose from "mongoose";

const MethodSchema = new mongoose.Schema({
    name: String,
    items: [
      {
        title: String,
        description: String,
        image: String,
        animImage:String
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
    introTitle:{
        type:String
    },
    introDescription:{
        type:String
    },
    introImage:{
        type:String
    },
    method:MethodSchema,
    slug:{
        type:String
    }
})

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

export default Service;
