const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

const staffSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    locationId: { type: "ObjectId", ref: "Location" },
    isActive: Boolean
  },
  { timestamps: true }
);
module.exports = mongoose.model("Staff", staffSchema);
