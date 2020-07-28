var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

require("dotenv").config();
const passport = require("passport");
const AppError = require("./utils/appError");
const cors = require("cors");

var app = express();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB, {
    // some options to deal with deprecated warning, you don't have to worry about them.
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"));

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());


//routes//
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var authRouter = require("./routes/auth");
var gameRouter = require("./routes/game");
var wishlistRouter = require("./routes/wishlist");
var reviewRouter = require("./routes/review");
var cartRouter = require("./routes/cart");
var passwordRouter = require("./routes/password")
var orderRouter = require("./routes/order")

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/game", gameRouter);
app.use("/wishlist", wishlistRouter);
app.use("/review", reviewRouter);
app.use("/cart", cartRouter);
app.use("/password", passwordRouter)
app.use("/order", orderRouter)

app.route("*").all(function (req, res, next) {
  next(new AppError(404, "Route not found")); //go straight to the middleware
});
//routes-end

// error handler
const errorController = require("./utils/errorController");
app.use(errorController);

module.exports = app;
