var express = require("express");
var router = express.Router();

const {
  createWishlist,
  getWishlist,
  deleteWishlist,
} = require("../controllers/wishlistController");
const { loginRequired } = require("../middleware/auth.js");

router.route("/").get(loginRequired, getWishlist);

router
  .route("/:rawgId")
  .post(loginRequired, createWishlist)

router.route("/:rawgId").delete(loginRequired, deleteWishlist);

//get all current information on me
// router.route("/:wishID").delete(loginRequired, deleteWishlist);

module.exports = router;
