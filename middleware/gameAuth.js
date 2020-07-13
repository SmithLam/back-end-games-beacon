const Game = require("../models/Game");

exports.GameIDValidate = async (req, res, next) => {
  try {
    const gameID = req.params.gameID;
    console.log("what is gameID", gameID);
    if (!gameID) return res.status(400).send("We require a game");
    const game = await Game.findById(gameID);
    if (!game) return res.status(404);
    req.game = game;
    next();
  } catch (err) {
    return res.send(err.message);
  }
};
