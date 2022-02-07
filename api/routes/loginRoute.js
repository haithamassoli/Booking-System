var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const User = require("../models/User").model;

router.post("/", function (req, res, next) {
  console.log(req.body);
  User.find(
    { email: req.body.email, password: req.body.password },
    (err, docs) => {
      if (!err) {
        if (docs.length > 0) {
          req.session.user = docs[0];
          res.status(200).send(docs[0]);
        }
      } else {
        res.status(400).send("Could not search for user");
      }
    }
  );
});

router.get("/", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

module.exports = router;
