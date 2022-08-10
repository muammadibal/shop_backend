const Product = require("../models/Product");
const ProductImage = require("../models/ProductImage");

module.exports = {
  getAllProduct: async (req, res, next) => {
    const product = await Product.find()
    res.json({
      message: "get all product success",
      data: product
    })
  },
  getProduct: async (req, res, next) => {
    const { id } = req.body
    const product = await Product.findOne({ _id: id })
    if (product) {
      res.json({
        message: "get product success",
        data: product
      })
    } else {
      res.json({
        message: "get product failed, not found",
        data: null
      })
    }
  },
  createProduct: async (req, res, next) => {
    const { userId, title, image, description, price, discountPrice } = req.body;
    if (userId && description && price) {
      const product = new Product();
      const productImage = new ProductImage();
      product.userId = userId;
      product.title = title;
      product.description = description;
      product.price = price;
      product.discountPrice = discountPrice;

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

        let image = productImage.find({ productId: product._id });
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
  updateProduct: async (req, res, next) => {
    const { id, title, image, description, price, discountPrice } = req.body
    try {
      const productImage = new ProductImage()
      const product = await Product.findOneAndUpdate({ _id: id }, {
        title: title, description: description, price: price, discountPrice: discountPrice
      })

      if (product) {
        if (Array.isArray(image) && image?.length > 0) {
          for (const img in image) {
            productImage.findOneAndUpdate({ _id: id }, { image: img });
          }

          let image = productImage.find({ productId: id });

          res.json({
            message: "create product success",
            data: {
              ...product,
              ...image,
            },
          });
        } else {
          res.json({
            message: "update product success",
            data: product
          });
        }
      } else {
        res.json({
          message: "update product failed, not found",
        });

      }
    } catch (error) {
      res.json({
        message: error,
      });
    }

  },
  deleteProduct: async (req, res, next) => {
    const { id } = req.body
    const product = await Product.findOne({ _id: id })
    if (product) {
      product.delete()
      res.json({
        message: "delete product success",
        data: null
      })
    } else {
      res.json({
        message: "delete product failed, not found",
        data: null
      })
    }
  },
};
