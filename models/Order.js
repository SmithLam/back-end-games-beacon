const mongoose = require("mongoose");
const User = require("./User");

const Schema = new mongoose.Schema(
  {
    paymentID: {
      type: Number,
    },
    buyer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    cartId: { type: mongoose.Schema.ObjectId, ref: "Cart", required: true },
    items: [
      {
        rawgId: { type: Number },
        price: { type: Number },
        name: { type: String },
        cover: { type: String },
      },
    ],
    total: { type: Number },
    status: {
      type: String,
      default: "COMPLETED",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

module.exports = mongoose.model("Order", Schema);
