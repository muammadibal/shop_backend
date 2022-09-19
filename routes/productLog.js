var express = require("express");
const {
  getProductRelated,
  getProductTopSell,
  getProductTopCheckout,
  getProductTopWishlist,
} = require("../controllers/productLogController");
var router = express.Router();

/* GET users listing. */
router.post("/related", getProductRelated);
router.post("/top-sell", getProductTopSell);
router.post("/top-checkout", getProductTopCheckout);
router.post("/top-wishlist", getProductTopWishlist);
router.post("/top-rated", getProductRelated);

module.exports = router;
