var express = require("express");
var router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");
const {
  createCart,
  getAllCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");

const protectedRouter = withJWTAuthMiddleware(router, process.env.JWT_SECRET);

protectedRouter.get("/", getAllCart);
protectedRouter.post("/", createCart);
protectedRouter.put("/", updateCart);
protectedRouter.delete("/", deleteCart);

module.exports = router;
