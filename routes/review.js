var express = require("express");
var router = express.Router();

const {
  createReview,
} = require("../controllers/reviewController");
const { loginRequired } = require("../middleware/auth.js");
const { gameIdValidate } = require("../middleware/gameAuth");

// router.route("/").get(loginRequired, getReview);

router
  .route("/:gameId")
  .post(loginRequired, gameIdValidate, createReview)


module.exports = router;
