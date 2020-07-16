const Wishlist = require("../models/Wishlist");

// user: {
//   type: mongoose.Schema.ObjectId,
//   ref: "User",
//   required: [true, "the user who likes is required"],
// },
// gameId: {
//   type: mongoose.Schema.ObjectId,
//   ref: "Game",
//   required: [true, "the game that is liked is required"],
// },
// rawgId: { type: Number, required: [true, "rawgId is necessary"] },

exports.createWishlist = async (req, res, next) => {
  try {
    const user = req.user._id;
    const gameId = req.params.gameId;
    const rawgId = req.body.rawgId;
    if (!user || !gameId) {
      return res.status(400).json({
        status: "failed",
        error: "user id and game id, rawgId are all required",
      });
    }
    const check = await Wishlist.exists({
      user: user,
      gameId: gameId,
    });
    if (check) {
      throw new Error("You already wishlisted this");
    }
    const wishlist = await Wishlist.create({
      user,
      gameId,
      rawgId,
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
    const wishlist = await Wishlist.find({ user: userId });
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

exports.deleteWishlist = async (req, res, next) => {
  try {
    const user = req.user._id;
    const rawgId = req.params.rawgId;
    if (!user || !rawgId) {
      return res.status(400).json({
        status: "failed",
        error: "user id and rawg id are required for deletion",
      });
    }
    const wishlistDeleted = await Wishlist.findOneAndDelete({
      user: user,
      rawgId: rawgId,
    });
    if (!wishlistDeleted) {
      throw new Error("there is no such wishlist");
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};
