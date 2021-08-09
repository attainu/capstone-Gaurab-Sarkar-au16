const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  res.send("Users route");
});

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password should have atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({errors: error.array()})
    }
    // console.log(req.body);
    res.send("Users route");
  }
);

module.exports = router;
