const TransactionProduct = require("../models/TransactionProduct");

module.exports = {
  getAllTransactionProduct: async (req, res, next) => {
    const { userId } = req.body;
    try {
      const transaction = await TransactionProduct.find({
        userId: userId,
      }).populate("userId productId");

      if (transaction.length > 0) {
        res.json({
          message: "Get transaction success",
          data: transaction,
        });
      } else {
        res.json({
          message: "Transaction not exists",
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
  createTransactionProduct: async (req, res, next) => {
    const { userId, productId } = req.body;

    try {
      const checkTransactionProduct = await TransactionProduct.findOne({
        userId,
        productId,
      });

      if (!checkTransactionProduct) {
        let cart = await TransactionProduct.create({
          userId: userId,
          productId: productId,
        });

        res.json({
          message: "Transaction added",
          data: cart,
        });
      } else {
        checkTransactionProduct.quantity += 1;
        checkTransactionProduct.save();

        res.json({
          message: "Transaction has been added",
          data: checkTransactionProduct,
        });
      }
    } catch (error) {
      res.json({
        message: error?.message,
        data: null,
      });
    }
  },
  updateTransactionProduct: async (req, res, next) => {
    const { id, userId, productId, quantity } = req.body;

    try {
      const checkTransactionProduct = await TransactionProduct.findOne({
        _id: id,
        userId,
        productId,
      });

      if (!checkTransactionProduct) {
        let cart = await TransactionProduct.create({
          userId: userId,
          productId: productId,
        });

        res.json({
          message: "Transaction added to cart",
          data: cart,
        });
      } else {
        checkTransactionProduct.quantity = quantity;
        checkTransactionProduct.save();

        res.json({
          message: "Transaction has been updated",
          data: checkTransactionProduct,
        });
      }
    } catch (error) {
      res.json({
        message: error?.message,
        data: null,
      });
    }
  },
  deleteTransactionProduct: async (req, res, next) => {
    const { id } = req.body;
    try {
      const cart = await TransactionProduct.findOne({ _id: id });

      if (cart) {
        cart.delete();
        res.json({
          message: "Transaction deleted",
          data: null,
        });
      } else {
        res.json({
          message: "Transaction not found",
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
