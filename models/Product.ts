import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    wattage:{
        type:String,
        required:true
    },
    lumen:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    images:[String],
    thumbnail:{
        type:String,
        required:true
    },
    altTag:{
        type:String
    },
    specifications:[
        {
            name:String,
            items:[
                {
                    title:String,
                    value:String
                }
            ]
        }
    ],
    file:{
        type:String,
    },
    metaTitle:{
        type:String
    },
    metaDescription:{
        type:String
    }
})

export default mongoose.models.Product || mongoose.model("Product",productSchema);
