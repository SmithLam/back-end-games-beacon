const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    rawgId: {
      type: Number,
      required: [true, "rawgId is required"],
      unique: true,
    },
    cheapId: {
      type: Number,
      required: [true, "cheapId is required"],
      unique: true,
    },
    rawgName: {
      type: String,
      required: [true, "rawgName is required"],
    },
    rawgCover: {
      type: String,
      required: [true, "rawgCover is required"],
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

schema.pre("save", async function (next) {
  next();
});

module.exports = mongoose.model("Game", schema);
