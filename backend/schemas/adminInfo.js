const mongoose = require("mongoose");

const adminInfoSchema = new mongoose.Schema({
    temperature: {
        type: String,
        required: true,
    },
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("adminInfo", adminInfoSchema);