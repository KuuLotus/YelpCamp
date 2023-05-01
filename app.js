const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Joi = require("joi");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");

const campgroundRoutes = require("./routes/campgrounds");
const reviewsRoutes = require("./routes/reviews");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelpCamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDBコネクションOK!!");
  })
  .catch((err) => {
    console.log("MongoDBコネクションエラー!!");
    console.log(err);
  });

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ミドルウェア
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("ページが見つかりませんでした", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    message = "問題が起きました";
  }
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("ポート3000で待受中。。。");
});
