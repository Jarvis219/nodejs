import mongoose from "mongoose";
const inforSchema = mongoose.Schema({
    logo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxLength: 50,
    },
    address: {
        type: String,
        required: true,
        maxLength: 300
    },
    slogan: {
        type: String,
        maxLength: 150
    },
    numberPhone: {
        type: String,
        required: true,
        maxLength: 100,
    },
    linkMap: {
        type: String,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Information", inforSchema);