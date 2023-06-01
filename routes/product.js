const express = require("express");
const productRouter = express.Router();
const auth = require("../middlewares/auth.js");
const {getProduct, getProductBySearch} = require("../controller/product_controller.js");


//get product
productRouter.get("/api/products/", auth, getProduct);

// create a get request to search products and get them
// /api/products/search/i
productRouter.get("/api/products/search=:name",auth, getProductBySearch);


module.exports = productRouter;


