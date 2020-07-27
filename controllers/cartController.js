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
    const rawgId = req.params.rawgId;
    const price = req.body.price;
    const name = req.body.name;
    const cover = req.body.cover;
    if (!rawgId || !price) {
      return res.status(400).json({
        status: "failed",
        error: "game id and prices are required",
      });
    }
    let item = {
      rawgId: rawgId,
      price: price,
      name: name,
      cover: cover,
    };
    console.log("this is the game to add here", item);
    let cart = await Cart.findOne({
      buyer: buyer,
      status: "PENDING",
    });
    if (!cart) {
      throw new Error("You don't have a cart for this");
    }
    if (cart.items.filter((item) => item.name === name).length > 0) {
      throw new Error("This game is already inside cart");
    } else {
      cart.items.push(item);
    }
    let cartPrices = cart.items.map((e) => e.price);
    cart.total = cartPrices.reduce((a, b) => a + b).toFixed(2);
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
    const rawgId = req.params.rawgId;
    if (!rawgId || !buyer) {
      return res.status(400).json({
        status: "failed",
        error: "buyer id and game id are required",
      });
    }
    let cart = await Cart.findOne({
      buyer: buyer,
      status: "PENDING",
    });
    if (!cart) {
      throw new Error("You don't have a cart for this");
    }
    cart.items = cart.items.filter((item) => item.rawgId != rawgId);
    console.log("this is the new filtered cart", cart);
    if (cart.items.length === 0) {
      cart.total = 0;
    } else {
      let cartPrices = cart.items.map((e) => e.price);
      cart.total = cartPrices.reduce((a, b) => a + b).toFixed(2);
    }
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
