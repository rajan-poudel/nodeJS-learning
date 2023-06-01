const express = require("express");
const adminRoute = express.Router();
const admin = require("../middlewares/admin");
const { postProduct, getProduct } = require("../controller/admin_controller");

//create a admin middleware
adminRoute.post("/admin/add-product",admin,postProduct)

// Get all your products
adminRoute.get("/admin/get-products", admin,getProduct );

module.exports = adminRoute;
