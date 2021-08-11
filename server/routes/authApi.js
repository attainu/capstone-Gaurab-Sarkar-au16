const express = require("express")
const router = express.Router()
const authorization = require("../middleware/authorization")
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

router.get("/", authorization, async(req, res) => {
  try {
    // console.log(req.user)
    const user = await User.findById(req.user.id).select("-password")
    console.log(user)
    res.json(user)
  } catch (error) {
    console.error(error.message)
  }
})

router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    // console.log(req.body);
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid username or password" }] });
      }
      
      const match = await bcrypt.compare(password, user.password)
      if(!match) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid username or password" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: 3600 * 24 },
        (err, token) => {
          if(err) throw err
          res.json({ token })
        }
      );
      // res.send("Users Created");
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router