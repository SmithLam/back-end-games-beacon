const Review = require("../models/Review");
//    author: {
//       type: mongoose.Schema.ObjectId,
//       ref: "User",
//       required: [true, "author of review is required"],
//     },
//     rating: {
//       type: Number,
//       required: [true, "rating is required"],
//       min: 1,
//       max: 5,
//     },
//     description: {
//       type: String,
//       trim: true,
//       mixlength: 5,
//       maxlength: 700,
//     },
//     rawgId: { type: Number, required: [true, "rawgId is required"] },
//     gameId: {
//       type: mongoose.Schema.ObjectId,
//       ref: "Game",
//       required: [true, "gameId is required"],
//     },

exports.createReview = async (req, res, next) => {
  try {
    const author = req.user._id;
    const gameId = req.params.gameId;
    const rating = req.body.rating;
    const rawgId = req.body.rawgId;
    const description = req.body.description;
    if (!author || !gameId || !rawgId || !rating) {
      return res.status(400).json({
        status: "failed",
        error: "author id and game id, rawgId, rating are all required",
      });
    }
    const check = await Review.exists({
      author: author,
      gameId: gameId,
    });
    if (check) {
      throw new Error("You already reviewed this");
    }
    const review = await Review.create({
      author: author,
      gameId: gameId,
      rawgId: rawgId,
      rating: rating,
      description: description,
    });
    res.status(201).json({
      status: "OK",
      data: review,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};
