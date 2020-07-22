var express = require("express");
var router = express.Router();

const {
  createUser,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userController");

// const { createCart } = require("../controllers/cartController");

const { loginRequired } = require("../middleware/auth.js");

router.route("/register").post(createUser);

//get all current information on me
router
  .route("/profile")
  .get(loginRequired, getMyProfile)
  .patch(loginRequired, updateMyProfile);

module.exports = router;
