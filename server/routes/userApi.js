const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

// get all users
router.get("/", (req, res) => {
  User.find()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// create new user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password should have atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    // console.log(req.body);
    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.save();
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

// get one user
router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "Id not valid" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// update a user
router.patch("/:id",(req, res) => {
  res.send("Patch Route")
})

// delete a user
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.remove({ _id: id })
    .then((result) => {
      res.status(200).json({
        message: "Deleted",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
