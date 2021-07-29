import mongoose from "mongoose";
const orderSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
        // unique: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
        maxlength: 50,
    },
    address: {
        type: String,
        trim: true,
        require: true,
        maxlength: 200,
    },
    note: {
        type: String,
        trim: true,
        maxlength: 300,
    },
    phone: {
        type: Number,
        required: true,
        maxLength: 12,
        trim: true
    },
    product: {
        type: Object,
    },
    sumMoney: {
        type: Number,
        trim: true,
        maxLength: 8,
        required: true
    },
    pay: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50
    },
    status: {
        type: String,
        trim: true,
        required: true,
    }




}, {
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema);