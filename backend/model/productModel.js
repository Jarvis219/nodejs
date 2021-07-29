const mongoose = require('mongoose')
const {
    ObjectId
} = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32
    },
    sale: {
        type: Number,
        maxlength: 32
    },

    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        type: String
        // data: Buffer,
        // contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    },
    content: {
        type: String
    },
    album: {
        type: Array,
    },
    size: {
        type: Array
    },
    classify: {
        type: String
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Product", productSchema)