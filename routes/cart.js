var express = require("express");
var router = express.Router();

const {
  getCart,
  updateCart,
  deleteItemInCart,
} = require("../controllers/cartController");
const { loginRequired } = require("../middleware/auth.js");




router.route("/").get(loginRequired, getCart);

router
  .route("/:rawgId")
  .patch(loginRequired, updateCart)
  .delete(loginRequired, deleteItemInCart);

module.exports = router;
