const Product = require("../models/Product");
const ProductImage = require("../models/ProductImage");

module.exports = {
  getAllProduct: async (req, res, next) => {
    const product = await Product.find();
    res.json({
      message: "get all product success",
      data: product,
    });
  },
  getProduct: async (req, res, next) => {
    const { id } = req.body;
    const product = await Product.findOne({ _id: id });
    if (product) {
      res.json({
        message: "get product success",
        data: product,
      });
    } else {
      res.json({
        message: "get product failed, not found",
        data: null,
      });
    }
  },
  createProduct: async (req, res, next) => {
    const { userId, title, image, description, price, discountPrice } =
      req.body;
    if (userId && description && price) {
      const product = new Product();

      product.userId = userId;
      product.title = title;
      product.description = description;
      product.price = price;
      product.discountPrice = discountPrice;

      if (Array.isArray(image) && image?.length > 0) {
        image?.map(async (img) => {
          let imgId = await ProductImage.create({ image: img });
          product.imageId.push({ _id: imgId._id.toString() });
          await product.save();
        });

        let valProduct = await Product.findOne({
          _id: product?._id.toString(),
        }).populate({
          path: "imageId",
          select: "id image",
        });

        console.log("valProduct", valProduct);

        res.json({
          message: "create product success",
          data: valProduct,
        });
      } else {
        product.save();

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
    const { id, title, image, description, price, discountPrice } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        description: description,
        price: price,
        discountPrice: discountPrice,
      }
    );

    // let imgs = [];

    if (Array.isArray(image) && image?.length > 0) {
      image?.map(async (img) => {
        await ProductImage.findOneAndUpdate({ productId: id }, { image: img });

        // imgs.push(valProductImage)
      });
    }

    if (product) {
      let imgs = await ProductImage.find({ productId: id });

      res.json({
        message: "update product success",
        data: {
          product,
          image: imgs,
        },
      });
    } else {
      res.json({
        message: "update product failed, not found",
      });
    }
  },
  deleteProduct: async (req, res, next) => {
    const { id } = req.body;
    const product = await Product.findOne({ _id: id });
    if (product) {
      product.delete();
      res.json({
        message: "delete product success",
        data: null,
      });
    } else {
      res.json({
        message: "delete product failed, not found",
        data: null,
      });
    }
  },
};
