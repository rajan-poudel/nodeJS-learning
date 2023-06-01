const express = require("express");
const productRouter = express.Router();
const auth = require("../middlewares/auth.js");
const {getProduct, getProductBySearch} = require("../controller/product_controller.js");


//get product
productRouter.get("/api/product/", auth, getProduct);

// create a get request to search products and get them
// /api/products/search/i
productRouter.get("/api/products/search/:name", getProductBySearch);


module.exports = productRouter;


