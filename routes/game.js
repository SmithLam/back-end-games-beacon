var express = require("express");
var router = express.Router();

const { createGame, getSingleGame, deleteGame } = require("../controllers/gameController");
const { loginRequired } = require("../middleware/auth.js");
const { gameIdValidate } = require("../middleware/gameAuth.js");

router.route("/create").post(loginRequired, createGame);

router.route("/:rawgId").get(loginRequired, getSingleGame)

router.route("/:gameId").delete(loginRequired, gameIdValidate, deleteGame);



module.exports = router;
