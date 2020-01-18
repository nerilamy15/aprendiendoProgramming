const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  userName: {
    type: String,
    default: "",
    min: 6,
    max: 255
  },
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
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dewhpk9yo/image/upload/v1579266670/user_rebiqg.png"
  },
  isAuthenticated: {
    type: Boolean,
    default: "false"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
