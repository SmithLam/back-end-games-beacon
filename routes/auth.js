var express = require("express");
var router = express.Router();

const {
  loginWithEmail,
  loginFacebook,
  loginGoogle,
} = require("../controllers/authController");

const { logoutMyProfile } = require("../controllers/userController");

const { loginRequired } = require("../middleware/auth.js");
const { route } = require(".");

router.route("/login/facebook").get(loginFacebook)

router.route("/login/google").get(loginGoogle);

router.route("/login").post(loginWithEmail);

router.route("/logout").get(loginRequired, logoutMyProfile);

module.exports = router;
