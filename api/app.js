require("dotenv").config();
var express = require("express");
var path = require("path");
var logger = require("morgan");
const mongoose = require("mongoose");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Mongo DB
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParse: true,
});
var db = mongoose.connection;

// Express
var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// Routes
app.use("/availability", require("./routes/availabilityRoute"));
app.use("/reserve", require("./routes/reservationRoute"));
app.use("/login", require("./routes/loginRoute"));
app.use("/signup", require("./routes/signupRoute"));

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", (_) => {
  console.log("Connected to DB");
});

module.exports = app;
