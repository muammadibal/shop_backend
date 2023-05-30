const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    productId: { type: "ObjectId", ref: "Product" },
    name: { type: String, required: true },
    couponTypeId: { type: "ObjectId", ref: "CouponType", required: true },
    code: String,
    image: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
