var express = require("express");
var router = express.Router();

const {
  createWishlist,
  getWishlist,
  deleteWishlist,
} = require("../controllers/wishlistController");
const { loginRequired } = require("../middleware/auth.js");
const { gameIdValidate } = require("../middleware/gameAuth");

router.route("/").get(loginRequired, getWishlist);

router
  .route("/:gameId")
  .post(loginRequired, gameIdValidate, createWishlist)

router.route("/:rawgId").delete(loginRequired, deleteWishlist);

//get all current information on me
// router.route("/:wishID").delete(loginRequired, deleteWishlist);

module.exports = router;
