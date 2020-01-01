const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
    animal: {
        type: String,
        required: true,
    },
    color : {
        type: String,
        required: true,
    },
    result : {
        type: String,
        required: true,
    },
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Info", infoSchema);