const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    memberType: { type: "ObjectId", ref: "MemberType" },
    isActive: Boolean
  },
  { timestamps: true }
);
module.exports = mongoose.model("Member", memberSchema);
