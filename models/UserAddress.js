const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

const userAddressSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    name: String,
    latitude: String,
    longitude: String,
    isActive: Boolean
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userAddressSchema);
