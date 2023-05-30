const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const couponTypeSchema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CouponType", couponTypeSchema);
