const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "the user who owned this game is required"],
    },
    rawgId: { type: Number },
    name: { type: String },
    cover: { type: String },
    orderId: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
      required: [true, "the order is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

module.exports = mongoose.model("Owned", Schema);
