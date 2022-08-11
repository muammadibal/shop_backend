const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const productImageSchema = new Schema({
  image: String,
});

module.exports = mongoose.model("ProductImage", productImageSchema);
