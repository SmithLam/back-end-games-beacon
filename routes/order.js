var express = require("express");
var router = express.Router();

const { getOrder, createOrder } = require("../controllers/orderController");
const { loginRequired } = require("../middleware/auth.js");

router.route("/").post(loginRequired, createOrder).get(loginRequired, getOrder);




module.exports = router;
