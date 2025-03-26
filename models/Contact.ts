import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    region: {
        type: String,
        required: true
    },
    area: [
        {
            name: {
                type: String,
            },
            type: {
                type: String,
            },
            address: {
                type: String,
            },
            telephone: {
                type: String,
            },
            mobile: {
                type: String,
            },
            email: {
                type: String,
            },
            mapIframe: {
                type: String,
            },
        }
    ]
})

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;


