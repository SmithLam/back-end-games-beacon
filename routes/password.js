var express = require("express");
var router = express.Router();

const {
  verifyEmail,
  resetPassword,
} = require("../controllers/passwordController");

router.route("/reset").post(verifyEmail).patch(resetPassword);

module.exports = router;
