import mongoose from "mongoose"

const enquirySchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    message:String,
    company:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry",enquirySchema)

export default Enquiry


