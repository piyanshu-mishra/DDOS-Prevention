const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    enum: ["full", "restricted"],
    default: "restricted",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Admin", AdminSchema)

