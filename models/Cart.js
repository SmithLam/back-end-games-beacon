const mongoose = require("mongoose");
const User = require("./user");

const Schema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    bought: [
      {
        gameID: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

module.exports = mongoose.model("Cart", Schema);
