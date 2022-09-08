const TransactionProduct = require("../models/TransactionProduct");
const TransactionProductDetail = require("../models/TransactionProductDetail");
const Cart = require("../models/Cart");

module.exports = {
  getAllTransactionProduct: async (req, res, next) => {
    const { userId } = req.body;
    try {
      const transaction = await TransactionProduct.find({ userId });
      // .populate(
      //   "transactionId"
      // );

      res.json({
        message: "Get transaction success",
        data: transaction,
      });
    } catch (error) {
      res.json({
        message: error?.message,
        data: null,
      });
    }
  },
  getTransactionProduct: async (req, res, next) => {
    const { id } = req.body;
    try {
      const transaction = await TransactionProduct.findOne({
        _id: id,
      }).populate("userId");
      const transactionDetail = await TransactionProductDetail.find({
        transactionId: id,
      }).populate("productId");

      if (transaction) {
        res.json({
          message: "Get transaction success",
          data: {
            transaction,
            transactionDetail,
          },
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
    const { carts, userId, transactionCode, transactionPrice } = req.body;

    try {
      let products = [];
      await Promise.all(
        carts?.map(async (valCart) => {
          let cart = await Cart.findOne({ _id: valCart.id }).populate(
            "productId"
          );
          if (parseInt(cart?.productId?.stock) >= parseInt(valCart.quantity)) {
            products.push(cart);
          } else {
            throw new Error(`Stock tidak mencukupi`);
          }
        })
      );

      let transaction = await TransactionProduct.create({
        userId,
        transactionCode,
        transactionPrice,
      });

      await Promise.all(
        products?.map(async (valProduct) => {
          await TransactionProductDetail.create({
            transactionId: transaction.id,
            productId: valProduct?.productId?._id,
            productName: valProduct?.productId?.title,
            productPrice: valProduct?.productId?.price,
            productThumbnail: valProduct?.productId?.thumbnail,
            discountType: valProduct?.productId?.discountType,
            discountAmount: valProduct?.productId?.discountAmount,
            quantity: valProduct?.quantity,
          });
        })
      );

      await Promise.all(
        carts?.map(async (valCart) => {
          await Cart.findOneAndDelete({ _id: valCart.id });
        })
      );

      let transactionData = await TransactionProductDetail.find({
        transactionId: transaction.id,
      }); //.populate("transactionId");

      res.json({
        message: "Transaction added",
        data: {
          transaction,
          transactionData,
        },
      });
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
      const transaction = await TransactionProduct.findOneAndDelete({
        _id: id,
      });
      const transactionDetail = await TransactionProductDetail.findOneAndDelete(
        { transactionId: id }
      );

      if (transaction) {
        transaction.delete();
        transactionDetail && transactionDetail.delete();
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
