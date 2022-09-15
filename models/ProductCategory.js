const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const productCategorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);
