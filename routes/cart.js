var express = require("express");
var router = express.Router();
const { createCart, getAllCart } = require("../controllers/cartController");
const { withJWTAuthMiddleware } = require("express-kun");

const protectedRouter = withJWTAuthMiddleware(router, process.env.JWT_SECRET);
/* GET users listing. */
protectedRouter.get("/", getAllCart);
protectedRouter.post("/", createCart);

module.exports = router;
