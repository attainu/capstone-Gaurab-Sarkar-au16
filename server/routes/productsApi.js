const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { check, validationResult } = require("express-validator");
const Product = require("../models/Product")

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty(),
      check("quantity", "Quantity is required").not().isEmpty()
    ],
  ],
  async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      console.log("user", req.user)
      console.log("body",req.body)
      const { name, description, category, price, brand, quantity } = req.body
      const newProduct = new Product({
        userId: req.user.id,
        name,
        description,
        category,
        price,
        brand,
        quantity
      })
      const product = await newProduct.save()
      res.json({ product })
    } catch (error) {
      console.error(error.message)
      res.status(500).json({message: "Server error"})
    }
  }
);

// get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
  }
});

// get a single product
router.get("/:id", async (req, res) => {
  try {    
    const products = await Product.findById(req.params.id)
    if(!products) {
      return res.status(400).json({msg: "Product was not found" })
    }
    res.json(products)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
  }
});

module.exports = router;
