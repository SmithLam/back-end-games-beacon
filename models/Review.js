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
    game: {
      type: mongoose.Schema.ObjectId,
      ref: "Game",
      required: true,
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
  console.log("what is the exp id", this.exp);
  await this.constructor.calculateAverage(this.exp);
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
  await this.doc.constructor.calculateAverage(this.doc.exp);
});

//calculate the average
schema.statics.calculateAverage = async function (expID) {
  //this refers to model
  const stats = await this.aggregate([
    {
      $match: { exp: expID },
    },
    //return array of reviews of an experience
    {
      $group: {
        _id: "$exp",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log("what is the stats here", stats);
  await Exp.findOneAndUpdate(
    { _id: expID },
    {
      nRating: stats.length > 0 ? stats[0].nRating : 0,
      averageRating: stats.length > 0 ? stats[0].avgRating : 0,
    }
  );
};

// schema.pre("save", async function (req, res, next) {
//   const reviewID = this._id;
//   const expID = this.exp;
//   const exp = await Experiences.findOne({ _id: expID });
//   const expReviews = exp.reviews;
//   console.log("This is the review id", reviewID);
//   console.log("This is the exp id", expID);
//   console.log("this is the exp targeted", expReviews);
//   const match = await Experiences.findOne({ reviews: reviewID });
//   console.log("does it match or not", match);
//   if (match) {
//     return next();
//   } else {
//     await expReviews.push(reviewID);
//     const addReview = await Experiences.findOneAndUpdate(
//       { _id: expID },
//       { reviews: expReviews },
//       { upsert: true, new: true, runValidators: true }
//     );
//     next();
//   }
// });

module.exports = mongoose.model("Review", schema);
