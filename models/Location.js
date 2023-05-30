const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
