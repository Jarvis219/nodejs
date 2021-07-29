import mongoose from "mongoose";
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 200
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        maxLength: 30
    },
    introduce: {
        type: String,
        required: true,
        maxLength: 255,
    },
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Post", postSchema);