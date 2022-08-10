var express = require("express");
const { signUp, signIn } = require("../controllers/userController");
var router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
