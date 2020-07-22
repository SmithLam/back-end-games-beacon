var express = require("express");
var router = express.Router();

const {
  getCart,
  updateCart,
  deleteItemInCart,
} = require("../controllers/cartController");
const { loginRequired } = require("../middleware/auth.js");
const { gameIdValidate } = require("../middleware/gameAuth");
const { deleteGame } = require("../controllers/gameController");


router.route("/").get(loginRequired, getCart);

router
  .route("/:gameId")
  .patch(loginRequired, gameIdValidate, updateCart)
  .delete(loginRequired, gameIdValidate, deleteItemInCart);

module.exports = router;
