const mongoose = require("mongoose");
const { schema } = require("./Wishlist");

const Schema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "the buyer is required"],
    },
    items: [
      {
        rawgId: { type: Number },
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
    total: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

Schema.pre("save", function (next) {
  try {
    console.log("total before checking", this.total);
    cartPrices = this.items.map((e) => e.price);
    console.log(cartPrices);
    if (cartPrices.length === 0) {
      this.total = 0;
    } else {
      this.total = cartPrices.reduce((a, b) => a + b).toFixed(2);
    }
    console.log("total after checking", this.total);
  } catch (err) {
    console.log(err);
  }
  next();
});

module.exports = mongoose.model("Cart", Schema);
