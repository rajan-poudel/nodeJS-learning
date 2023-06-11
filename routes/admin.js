const express = require("express");
const adminRoute = express.Router();
const admin = require("../middlewares/admin");
const { postProduct, getProduct, deleteProduct, singleProductDetail } = require("../controller/admin_controller");
const addCommonMetadata = require("../middlewares/common");
const { notFound } = require("../middlewares/error");

//create a admin middleware
adminRoute.post("/admin/add-product",admin,postProduct)
// Get all your products
adminRoute.get("/admin/get-products", admin,getProduct );
//get single product details
adminRoute.get("/admin/get-product/:id",admin,singleProductDetail)
//delete product
adminRoute.delete("/admin/delete-product/:id", admin,deleteProduct)

module.exports = adminRoute;
