const Cart = require("../models/Cart");



exports.getCart = async (req, res, next) => {
  try {
    const buyer = req.user._id;
    const cart = await Cart.findOne({ buyer: buyer, status: "PENDING" });
    res.status(201).json({
      status: "OK",
      data: cart,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const buyer = req.user._id;
    const gameId = req.params.gameId;
    const price = req.body.price;
    const name = req.body.name;
    const cover = req.body.cover;
    if (!gameId || !price) {
      return res.status(400).json({
        status: "failed",
        error: "game id and prices are required",
      });
    }
    let item = { gameId: gameId, price: price, name: name, cover: cover };
    console.log("this is the game to add here", item);
    let cart = await Cart.findOne({
      buyer: buyer,
      status: "PENDING",
    });
    if (!cart) {
      throw new Error("You don't have a cart for this");
    }
    console.log("This is the cart here", cart);
    cart.items.push(item);
    cart.save();
    res.status(201).json({
      status: "OK",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.deleteItemInCart = async (req, res, next) => {
  try {
    const buyer = req.user._id;
    const gameId = req.params.gameId;
    if (!gameId) {
      return res.status(400).json({
        status: "failed",
        error: "game id is required",
      });
    }
    let cart = await Cart.findOne({
      buyer: buyer,
      status: "PENDING",
    });
    if (!cart) {
      throw new Error("You don't have a cart for this");
    }
    cart.items = cart.items.filter((item) => item.gameId != gameId);
    cart.save();
    console.log("this is the new filtered cart", cart);
    res.status(201).json({
      status: "OK",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};
