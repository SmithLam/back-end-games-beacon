const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "the user who likes is required"],
    },
    rawgId: { type: Number, required: [true, "rawgId is necessary"] },
    name: { type: String },
    cover: { type: String },
    price: { type: Number },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

module.exports = mongoose.model("Wishlist", Schema);
