const Cart = require("../models/Cart");

module.exports = {
  getAllCart: async (req, res, next) => {
    const { userId } = req.body;
    try {
      const cart = await Cart.find({ userId: userId }).populate(
        "userId productId"
      );
      console.log("cart", cart);
      if (cart.length > 0) {
        res.json({
          message: "Get cart success",
          data: null,
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
    const { userId, productId } = req.body;

    try {
      const cart = await Cart.find({ userId, productId });
      if (!cart) {
        console.log("empty");
      } else {
        res.json({
          message: "Product has been added",
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
