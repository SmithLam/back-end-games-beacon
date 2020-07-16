const Wishlist = require("../models/Wishlist");

// user: {
//   type: mongoose.Schema.ObjectId,
//   ref: "User",
//   required: [true, "the user who likes is required"],
// },
// gameID: {
//   type: mongoose.Schema.ObjectId,
//   ref: "Game",
//   required: [true, "the game that is liked is required"],
// },

exports.createWishlist = async (req, res, next) => {
  try {
    const user = req.user._id;
    const gameId = req.params.gameId;
    if (!user || !gameId) {
      return res.status(400).json({
        status: "failed",
        error: "user id and game id are all required",
      });
    }
    const wishlist = await Wishlist.create({
      user,
      gameId,
    });
    res.status(201).json({
      status: "OK",
      data: wishlist,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({
        status: "failed",
        error: "the user of this wishlist is needed",
      });
    }
    const wishlist = await Wishlist.find({ user: userId })
    res.status(201).json({
      status: "OK",
      data: wishlist,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};
