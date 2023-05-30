const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const transactionComplainSchema = new Schema(
  {
    transactionComplainId: { type: "ObjectId", ref: "TransactionProduct" },
    name: String,
    description: String,
    image: String,
    isActive: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "TransactionComplain",
  transactionComplainSchema
);
