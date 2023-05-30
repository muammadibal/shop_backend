const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const memberType = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MemberType", memberType);
