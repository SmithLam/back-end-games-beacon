const User = require("../models/user");
const Wishlist = require("../models/Wishlist");
const Cart = require("../models/Cart");
const user = require("../models/user");

exports.createUser = async (req, res, next) => {
  try {
    const { email, name, password, type, avatar } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        status: "failed",
        error: "email, name, password are all required",
      });
    }
    const user = await User.create({
      email: email,
      name: name,
      password: password,
      avatar: avatar,
      type: type || "user",
    });
    res.status(201).json({
      status: "OK",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.getMyProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const wishlist = await Wishlist.find({ user: user._id });
    console.log("this is wish list", wishlist);
    const cart = await await Cart.findOne({
      buyer: user._id,
      status: "PENDING",
    });
    console.log("this is cart", cart);
    return res.status(200).json({
      status: "OK",
      data: user,
      wishlist: wishlist,
      cart: cart,
    });
  } catch (err) {
    return res.json({ status: "Failed", error: err.message });
  }
};

exports.updateMyProfile = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    console.log(req.body);
    if (!req.body) {
      throw new Error("Your update is unknown");
    }
    const fields = Object.keys(req.body); //get the field from new input
    fields.map((field) => (user[field] = req.body[field]));
    user.save();
    return res.json({ status: "Updated", data: user });
  } catch (err) {
    return res.send(err.message);
  }
};

exports.logoutMyProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const token = req.token;
    user.token = user.token.filter((item) => item !== token);
    await user.save();
    res.status(204).json({ status: "Logged out", data: null });
  } catch (err) {
    return res.send(err.message);
  }
};
