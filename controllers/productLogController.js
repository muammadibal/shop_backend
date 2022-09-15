const Product = require("../models/Product");
const ProductLog = require("../models/ProductLog");
const User = require("../models/User");

module.exports = {
  getProductRelated: async (req, res, next) => {
    const { productId } = req.body;

    try {
      const product = await Product.findOne({ product: productId });
      const productLog = await ProductLog.find({
        categoryId: product.productCategoryId.toString(),
      }).populate("productId userId categoryId");

      let productRelated = [];
      productLog.map((item) => productRelated.push(item.productId));

      res.json({
        message: "Success get related",
        data: productRelated,
      });
    } catch (error) {
      res.json({
        message: error?.message,
      });
    }
  },
  getProductTopSell: async (req, res, next) => {
    try {
      const product = await Product.find()
        .sort({ selled: -1 })
        .limit(50)
        .exec();

      res.json({
        message: "Success get top sell",
        data: product,
      });
    } catch (error) {
      res.json({
        message: error?.message,
      });
    }
  },
  getProductTopCheckout: async (req, res, next) => {
    try {
      const product = await ProductLog.find({ activity: "checkout" })
        .limit(50)
        .populate("productId userId categoryId")
        .exec();

      res.json({
        message: "Success get recommendation checkout",
        data: product,
      });
    } catch (error) {
      res.json({
        message: error?.message,
      });
    }
  },
  getProductTopWishlist: async (req, res, next) => {
    try {
      const product = await ProductLog.find({ activity: "wishlist" })
        .limit(50)
        .populate("productId userId categoryId")
        .exec();

      res.json({
        message: "Success get recommendation wishlist",
        data: product,
      });
    } catch (error) {
      res.json({
        message: error?.message,
      });
    }
  },
};
