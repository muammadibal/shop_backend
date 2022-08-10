const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const productImageSchema = new Schema({
  productId: { type: "ObjectId", ref: "Product" },
  image: String,
});

module.exports = mongoose.model("ProductImage", productImageSchema);
