var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
var productRouter = require("./routes/product");
var productCategoryRouter = require("./routes/productCategory");
var cartRouter = require("./routes/cart");
var transactionRouter = require("./routes/transaction");
var userRouter = require("./routes/user");
var usersRouter = require("./routes/users");
var productLogRouter = require("./routes/productLog");

mongoose
  .connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSW}@cluster0.eptj9dj.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((res) => console.log("success"))
  .catch((err) => console.log("err"));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

app.use(`/api/v1/product/`, productRouter);
app.use(`/api/v1/product/category`, productCategoryRouter);
app.use(`/api/v1/product/`, productLogRouter);
app.use(`/api/v1/cart/`, cartRouter);
app.use(`/api/v1/checkout/`, transactionRouter);
app.use(`/api/v1/users/`, usersRouter);
app.use(`/api/v1/user/`, userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
