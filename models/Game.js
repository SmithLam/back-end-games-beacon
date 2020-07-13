const mongoose = require("mongoose");
const { schema } = require("./user");

const Schema = new mongoose.Schema(
  {
    RAWGid: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    nRating: {
      type: Number,
      default: 0,
    },
    nSold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

module.exports = mongoose.model("Game", Schema);
