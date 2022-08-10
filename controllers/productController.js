const Product = require("../models/Product");
const ProductImage = require("../models/ProductImage");

module.exports = {
  getAllProduct: async (req, res, next) => {},
  getProduct: async (req, res, next) => {},
  createProduct: async (req, res, next) => {
    const { userId, image, description, price, discountPrice } = req.body;
    if (userId && description && price) {
      const product = new Product();
      const productImage = new ProductImage();
      product.userId = userId;
      product.description = description;
      product.price = price;

      if (discountPrice) {
        product.discountPrice = discountPrice;
      }

      product.save();

      if (Array.isArray(image) && image?.length > 0) {
        for (const img in image) {
          productImage.productId = product._id;
          productImage.image = img;
          productImage.save();
        }

        let image = productImage.findOne({ productId: product._id });
        res.json({
          message: "create product success",
          data: {
            ...product,
            ...image,
          },
        });
      } else {
        res.json({
          message: "create product success",
          data: product,
        });
      }
    } else {
      res.json({
        message: "description and price cannot be empty",
      });
    }
  },
  updateProduct: async (req, res, next) => {},
  deleteProduct: async (req, res, next) => {},
};
