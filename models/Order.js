const mongoose = require("mongoose");
const User = require("./user");

const Schema = new mongoose.Schema(
  {
    paymentID: {
      type: Number,
      required: true,
    },
    buyer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    cartId: { type: mongoose.Schema.ObjectId, ref: "Cart", required: true },
    bought: [
      {
        gameID: {
          type: mongoose.Schema.ObjectId,
          ref: "Game",
          required: true,
        },
        currentPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "cancelled", "completed"],
      required: [true, "Status for this order is required"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

module.exports = mongoose.model("Order", Schema);
