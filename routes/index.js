const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const User = mongoose.model("User");

router.get("/", (req, res) => {
  res.render("form", { title: "Registration form" });
});

router.post(
  "/",
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
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const user = new User(req.body);
      user
        .save()
        .then(() => {
          res.send("Thank you for your registration!");
        })
        .catch(err => {
          console.log(err);
          res.send("Sorry! Something went wrong.");
        });
    } else {
      res.render("form", {
        title: "Registration form",
        errors: errors.array(),
        data: req.body
      });
    }
  }
);

module.exports = router;
