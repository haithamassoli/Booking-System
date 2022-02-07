var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const User = require("../models/User").model;

router.post("/", function (req, res, next) {
  User.find({ email: req.body.email }, (err, docs) => {
    if (!err) {
      if (docs.length > 0) {
        // Record already exists
        console.log("User already exists.");
        res.status(200).send(docs[0]);
      } else {
        const user = new User({
          email: req.body.email,
          password: req.body.password,
        });
        user.save((err) => {
          if (err) {
            res.status(400).send("Error saving new User");
          } else {
            // Saved user
            console.log("Created new User");
            User.find({ email: req.body.email }, (err, docs) => {
              err ? res.sendStatus(400) : res.status(200).send(docs[0]);
              req.session.user = docs[0];
              // console.log(req.session.user);
            });
          }
        });
      }
    } else {
      res.status(400).send("Could not search for date");
    }
  });
});

module.exports = router;
