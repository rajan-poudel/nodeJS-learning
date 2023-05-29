const express = require("express");
const adminRoute = express.Router();
const admin = require("../middlewares/admin");
const Product = require("../models/product");

//create a admin middleware
adminRoute.post("/admin/add-product",admin, async (req, res) => {
  try {
    const { name, description, image, quantiy, price, category } = res.body;

    let product = new Product({
      name,
      description,
      image,
      quantiy,
      price,
      category,
    });

    product = await product.save();
    res.json(product);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = adminRoute;
