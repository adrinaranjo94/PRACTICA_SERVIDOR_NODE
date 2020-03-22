const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const User = mongoose.model("User");

const path = require("path");
const auth = require("http-auth");

const basic = auth.basic({
  file: path.join(__dirname, "../users.htpasswd")
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Registration form" });
});

router.get("/", (req, res) => {
  res.render("signin", { title: "Login form" });
});

router.get("/registrations", (req, res) => {
  User.find()
    .then(users => {
      res.render("index", { title: "Listing registrations", users });
    })
    .catch(() => {
      res.send("Sorry! Something went wrong.");
    });
});

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 1 })
      .withMessage("Please enter a name"),
    check("email")
      .isLength({ min: 1 })
      .withMessage("Please enter an email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Please enter a password")
  ],
  (req, res) => {
    errors = validationResult(req);

    if (errors.isEmpty()) {
      const user = new User(req.body);
      user
        .save()
        .then(() => {
          res.render("signin", {
            title: "Login form",
            errors: errors.array(),
            data: req.body
          });
        })
        .catch(err => {
          console.log(err);
          res.send("Sorry! Something went wrong.");
        });
    } else {
      res.render("signup", {
        title: "Register form",
        errors: errors.array(),
        data: req.body
      });
    }
  }
);

router.post(
  "/",
  [
    check("email")
      .isLength({ min: 1 })
      .withMessage("Please enter an email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Please enter a password")
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      var query = User.findOne({
        email: req.body.email,
        password: req.body.password
      });

      query.exec(function(err, user) {
        if (err) return handleError(err);
        if (user != null) {
          User.find({}).exec(function(err, users) {
            var userMap = [];
            users.forEach(function(user) {
              const tmpUser = new User({
                name: user.name,
                email: user.email,
                password: user.password
              });
              userMap.push(tmpUser);
            });
            res.render("index", {
              title: "Listing registrations",
              errors: errors.array(),
              users: userMap
            });
          });
        } else {
          errors = errors.array();
          errors.push({ msg: "User not valid." });
          res.render("signin", {
            title: "Login form",
            errors: errors,
            data: req.body
          });
        }
      });
    } else {
      res.render("signin", {
        title: "Login form",
        errors: errors.array(),
        data: req.body
      });
    }
  }
);

module.exports = router;
