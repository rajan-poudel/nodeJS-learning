const express = require("express");
const orderRouter = express.Router();
const auth = require("../middlewares/auth.js");
const createOrder = require("../controller/order_controller.js");


//get product
orderRouter.post("/api/orders", auth, createOrder);

module.exports = orderRouter;


