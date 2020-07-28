const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Owned = require("../models/Owned");

exports.getOrder = async (req, res, next) => {
  try {
    const buyer = req.user._id;
    if (!buyer) {
      throw new Error("There is no buyer found");
    }
    const order = await Order.findOne({ buyer: buyer });
    res.status(201).json({
      status: "OK",
      data: order,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const buyer = req.user._id;
    if (!buyer) {
      throw new Error("There is no buyer found");
    }
    const cart = await Cart.findOne({
      buyer: buyer,
      status: "PENDING",
    });
    if (!cart) {
      throw new Error("There is cart found");
    }
    const order = await Order.create({
      buyer: buyer,
      cartId: cart._id,
      items: cart.items,
      total: cart.total,
    });
    const items = cart.items.map((game) => {
      const obj = { ...game };
      delete obj._id;
      obj.user = buyer;
      obj.orderId = order._id;
      obj.rawgId = game.rawgId;
      obj.name = game.name;
      obj.cover = game.cover;
      console.log("this game in items", obj);
      return obj;
    });
    console.log("this is owned games", items);
    const owned = Owned.insertMany(items);
    cart.items = [];
    cart.total = 0;
    await cart.save();
    res.status(201).json({
      status: "OK",
      data: order,
    });
  } catch (err) {
    console.log(err.message);
  }
};
