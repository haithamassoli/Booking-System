require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var cors = require("cors");

// Mongo DB
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParse: true,
});
var db = mongoose.connection;
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/availability", require("./routes/availabilityRoute"));
app.use("/reservation", require("./routes/reservationRoute"));
db.on("error", console.error.bind(console, "connection error"));
db.once("open", (_) => {
  console.log("Connected to DB");
});

app.listen(3005, () => {
  console.log("Server running in port 3001");
});
module.exports = app;
