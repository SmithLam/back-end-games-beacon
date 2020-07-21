const User = require("../models/user");
const Wishlist = require("../models/Wishlist");
const Cart = require("../models/Cart");
const axios = require("axios");

exports.loginWithEmail = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: "fail" });
  }
  const user = await User.loginWithEmail(email, password);
  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", error: "wrong email or password" });
  }
  const token = await user.generateToken();
  const wishlist = await Wishlist.find({ user: user._id });
  console.log("this is wish list", wishlist);
  const cart = await Cart.findOne({ buyer: user._id, status: "PENDING" });
  console.log("this is cart", cart);
  return res
    .status(200)
    .json({ status: "OK", data: user, token, wishlist: wishlist, cart: cart });
};

exports.loginFacebook = async (req, res, next) => {
  const fbToken = req.query.token;
  if (!fbToken) {
    return res
      .status(401)
      .json({ status: "fail", error: "need Facebook token" });
  }
  const data = await axios.get(
    `https://graph.facebook.com/me?fields=id,name,email&access_token=${fbToken}`
  );
  console.log("This is Facebook user data", data);
  const FacebookPicture = `https://graph.facebook.com/v7.0/${data.data.id}/picture`;
  const user = await User.findOneOrCreate({
    email: data.data.email,
    name: data.data.name,
    avatar: FacebookPicture,
  });
  const token = await user.generateToken();
  const wishlist = await Wishlist.find({ user: user._id });
  console.log("this is wish list", wishlist);
  const cart = await Cart.findOne({ buyer: user._id, status: "PENDING" });
  console.log("this is cart", cart);
  return res
    .status(200)
    .json({ status: "OK", data: user, token, wishlist: wishlist, cart: cart });
};

exports.loginGoogle = async (req, res, next) => {
  const googleToken = req.query.token;
  if (!googleToken) {
    return res.status(401).json({ status: "fail", error: "need Google token" });
  }
  const data = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleToken}`
  );
  console.log("This is Google user data", data);
  const user = await User.findOneOrCreate({
    email: data.data.email,
    name: data.data.name,
    avatar: data.data.picture,
  });
  const token = await user.generateToken();
  const wishlist = await Wishlist.find({ user: user._id });
  if (!wishlist) {
    wishlist === null;
  }
  console.log("this is wish list", wishlist);
  const cart = await Cart.findOne({ buyer: user._id, status: "PENDING" });
  if (!cart) {
    wishlist === null;
  }
  console.log("this is cart", cart);
  return res
    .status(200)
    .json({ status: "OK", data: user, token, wishlist: wishlist, cart: cart });
};
