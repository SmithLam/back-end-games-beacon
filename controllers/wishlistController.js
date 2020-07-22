const Wishlist = require("../models/Wishlist");
const Game = require("../models/Game");


exports.createWishlist = async (req, res, next) => {
  try {
    const user = req.user._id;
    const rawgId = req.params.rawgId;
    const name = req.body.name;
    const cover = req.body.cover;
    const price = req.body.price;

    if (!user || !rawgId) {
      return res.status(400).json({
        status: "failed",
        error: "user id and rawgId are all required",
      });
    }
    const check = await Wishlist.exists({
      user: user,
      rawgId: rawgId,
    });
    if (check) {
      throw new Error("You already wishlisted this");
    }
    const wishlist = await Wishlist.create({
      user,
      rawgId,
      name,
      cover,
      price,
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
