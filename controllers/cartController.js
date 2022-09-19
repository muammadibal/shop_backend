const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ProductLog = require("../models/ProductLog");

module.exports = {
  getAllCart: async (req, res, next) => {
    const { userId } = req.body;
    try {
      const cart = await Cart.find({ userId: userId }).populate(
        "userId productId"
      );

      if (cart.length > 0) {
        res.json({
          message: "Get cart success",
          data: cart,
        });
      } else {
        res.json({
          message: "Cart not exists",
          data: null,
        });
      }
    } catch (error) {
      res.json({
        message: error?.message,
        data: null,
      });
    }
  },
  createCart: async (req, res, next) => {
    const { userId, productId, productCategoryId } = req.body;

    try {
      const checkCart = await Cart.findOne({ userId, productId });

      if (!checkCart) {
        let cart = await Cart.create({
          userId: userId,
          productId: productId,
        });

        const productLog = new ProductLog();
        productLog.activity = "cart";
        productLog.categoryId = productCategoryId;
        productLog.productId = productId;
        productLog.userId = userId;
        productLog.save();

        res.json({
          message: "Product added to cart",
          data: cart,
        });
      } else {
        checkCart.quantity += 1;
        checkCart.save();

        res.json({
          message: "Product has been added",
          data: checkCart,
        });
      }
    } catch (error) {
      res.json({
        message: error?.message,
        data: null,
      });
    }
  },
  updateCart: async (req, res, next) => {
    const { id, userId, productId, quantity } = req.body;

    try {
      const checkCart = await Cart.findOne({ _id: id, userId, productId });

      if (!checkCart) {
        let cart = await Cart.create({
          userId: userId,
          productId: productId,
        });

        res.json({
          message: "Product added to cart",
          data: cart,
        });
      } else {
        checkCart.quantity = quantity;
        checkCart.save();

        res.json({
          message: "Product has been updated",
          data: checkCart,
        });
      }
    } catch (error) {
      res.json({
        message: error?.message,
        data: null,
      });
    }
  },
  deleteCart: async (req, res, next) => {
    const { id } = req.body;
    try {
      const cart = await Cart.findOne({ _id: id });

      if (cart) {
        cart.delete();
        res.json({
          message: "Product deleted from cart",
          data: null,
        });
      } else {
        res.json({
          message: "Cart not found",
          data: null,
        });
      }
    } catch (error) {
      res.json({
        message: error?.message,
        data: null,
      });
    }
  },
};
