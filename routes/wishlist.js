var express = require("express");
var router = express.Router();

const {
  createWishlist,
  getWishlist,
} = require("../controllers/wishlistController");
const { loginRequired } = require("../middleware/auth.js");
const { gameIdValidate } = require("../middleware/gameAuth");

router.route("/").get(loginRequired, getWishlist);

router.route("/:gameId").post(loginRequired, gameIdValidate, createWishlist);

//get all current information on me
// router.route("/:wishID").delete(loginRequired, deleteWishlist);

module.exports = router;
