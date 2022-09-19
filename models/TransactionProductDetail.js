const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const transactionProductDetailSchema = new Schema(
  {
    transactionId: {
      type: "ObjectId",
      ref: "TransactionProduct",
      required: true,
    },
    productId: { type: "ObjectId", ref: "Product", required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productThumbnail: { type: String, required: true },
    discountType: { type: String, required: true, default: "disable" },
    discountAmount: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "TransactionProductDetail",
  transactionProductDetailSchema
);
