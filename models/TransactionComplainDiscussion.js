const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const transactionComplainSchema = new Schema(
  {
    transactionComplainId: { type: "ObjectId", ref: "TransactionProduct" },
    from: { type: "ObjectId", ref: "User" },
    message: String
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "TransactionComplainDiscussion",
  transactionComplainSchema
);
