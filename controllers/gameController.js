const Game = require("../models/Game");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// rawgId: {
//   type: Number,
//   required: true,
// },
// rawgName: {
//   type: String,
//   required: true,
// },
// rawgCover: {
//   type: String,
// },
// averageRating: {
//   type: Number,
//   default: 0,
//   min: 0,
//   max: 5,
// },
// nRating: {
//   type: Number,
//   default: 0,
// },
// nSold: {
//   type: Number,
//   default: 0,
// },

exports.createGame = catchAsync(async (req, res, next) => {
  console.log("this is the create game body", req.body);
  const { rawgId, cheapId, rawgName, rawgCover } = req.body;
  if (!rawgId || !cheapId || !rawgName || !rawgCover) {
    return res.status(400).json({
      status: "fail",
      error: "RAWG id, cheap ID, name and cover are necessary",
    });
  }
  const game = await Game.create({
    rawgId,
    cheapId,
    rawgName,
    rawgCover,
  });
  res.status(201).json({ status: "ok", data: game });
});

exports.getSingleGame = catchAsync(async (req, res, next) => {
  const rawgId = req.params.rawgId;
  const game = await Game.findOne({ rawgId: rawgId });
  res.status(201).json({ status: "ok", data: game });
});

exports.deleteGame = catchAsync(async (req, res, next) => {
  let id = req.params.gameId;
  const game = await Game.findOneAndDelete(id);
  if (!game) {
    return next(new AppError("404", "No document found"));
  }
  game.save();
  res.status(201).json({ status: "ok", data: game });
});
