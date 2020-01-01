const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255},
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    role: {
        type: String,
        default: "basic",
        enum: ["basic", "superadmin"]
    },
    isAuthenticated :{
        type : Boolean
    },
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema);