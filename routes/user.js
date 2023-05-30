var express = require("express");
const {
  signUp,
  signIn,
  editUser,
  resetPassword,
  forgotPassword,
  updatePassword
} = require("../controllers/userController");
var router = express.Router();
const { auth } = require("../middleware/auth");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/edit-user", auth, editUser);
router.post("/forgot-password", forgotPassword);
router.get("/password-reset/:token", resetPassword);
router.post("/update-password", auth, updatePassword);

module.exports = router;
