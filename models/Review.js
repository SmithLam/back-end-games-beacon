const mongoose = require("mongoose");
const Game = require("./Game");
const AppError = require("../utils/appError");

const schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "author of review is required"],
    },
    rating: {
      type: Number,
      required: [true, "rating is required"],
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      trim: true,
      mixlength: 5,
      maxlength: 700,
    },
    rawgId: { type: Number, required: [true, "rawgId is required"] },
    gameId: {
      type: mongoose.Schema.ObjectId,
      ref: "Game",
      required: [true, "gameId is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

//middleware for post(save)
schema.post("save", async function () {
  // "this" ==== review doc (review instance)
  console.log("what is the game id", this.gameId);
  await this.constructor.calculateAverage(this.gameId);
});

schema.pre(/^findOneAnd/, async function (next) {
  //this === Review.query
  this.doc = await this.findOne();
  if (!this.doc) {
    next(new AppError(404, "Doc not found"));
  }
  return next();
});

//query middleware to trigger upon findOneAnd...
schema.post(/^findOneAnd/, async function () {
  //this === Review.query
  //this.contructor === Review node
  await this.doc.constructor.calculateAverage(this.doc.rawgId);
});

//calculate the average
schema.statics.calculateAverage = async function (gameId) {
  //this refers to model
  const stats = await this.aggregate([
    {
      $match: { gameId: gameId },
    },
    //return array of reviews of an experience
    {
      $group: {
        _id: "$gameId",
        nRating: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log("what is the stats here", stats);
  await Game.findOneAndUpdate(
    { _id: gameId },
    {
      nRating: stats.length > 0 ? stats[0].nRating : 0,
      averageRating: stats.length > 0 ? stats[0].averageRating : 0,
    }
  );
};

module.exports = mongoose.model("Review", schema);
