const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const productImageSchema = new Schema({
  imageUrl: String,
  productId: { type: "ObjectId", ref: "Product" },
});

module.exports = mongoose.model("ProductImage", productImageSchema);
