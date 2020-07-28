var express = require("express");
var router = express.Router();

const { getOwned, createOrder } = require("../controllers/orderController");
const { loginRequired } = require("../middleware/auth.js");

router.route("/").post(loginRequired, createOrder);

router.route("/owned").get(loginRequired, getOwned);

module.exports = router;
