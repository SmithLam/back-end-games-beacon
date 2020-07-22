const Game = require("../models/Game");

exports.gameIdValidate = async (req, res, next) => {
  try {
    console.log(req.params.gameId);
    const gameId = req.params.gameId;
    console.log("what is gameId", gameId);
    if (!gameId) return res.status(400).send("We require a game");
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).send("No game found");
    req.game = game;
    next();
  } catch (err) {
    return res.send(err.message);
  }
};
