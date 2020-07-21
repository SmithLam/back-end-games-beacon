const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "the buyer is required"],
    },
    items: [
      {
        gameId: { type: mongoose.Schema.ObjectId, ref: "Game" },
        price: { type: Number },
        name: { type: String },
        cover: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["PENDING", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

module.exports = mongoose.model("Cart", Schema);
