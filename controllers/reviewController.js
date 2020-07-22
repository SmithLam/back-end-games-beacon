const Review = require("../models/Review");

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
