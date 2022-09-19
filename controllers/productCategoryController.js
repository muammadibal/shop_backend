const ProductCategory = require("../models/ProductCategory");

module.exports = {
  getAllProductCategory: async (req, res, next) => {
    try {
      const productCategory = await ProductCategory.find();
      res.json({
        message: "Success get all product category",
        data: productCategory,
      });
    } catch (error) {
      res.json({
        message: error?.message,
      });
    }
  },
  createProductCategory: async (req, res, next) => {
    const { name } = req.body;

    try {
      const productCategory = new ProductCategory();

      productCategory.name = name;
      productCategory.save();

      res.json({
        message: "Success create product category",
        data: productCategory,
      });
    } catch (error) {
      res.json({
        message: error?.message,
      });
    }
  },
  updateProductCategory: async (req, res, next) => {
    const { id, name } = req.body;

    try {
      const productCategory = await ProductCategory.findOne({ _id: id });

      productCategory.name = name;
      productCategory.save();

      res.json({
        message: "Success update product category",
        data: productCategory,
      });
    } catch (error) {
      res.json({
        message: error?.message,
      });
    }
  },
  deleteProductCategory: async (req, res, next) => {
    const { id } = req.body;

    try {
      const productCategory = await ProductCategory.findOne({ _id: id });

      if (productCategory) {
        productCategory.delete();
        res.json({
          message: "Success delete product category",
          data: null,
        });
      } else {
        res.json({
          message: "Product category not exists",
          data: null,
        });
      }
    } catch (error) {
      res.json({
        message: error?.message,
      });
    }
  },
};
