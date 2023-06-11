const express = require("express");
const orderRouter = express.Router();
const auth = require("../middlewares/auth.js");
const { createOrder, getOrder, deleteOrder } = require("../controller/order_controller.js");

//post order
orderRouter.post("/api/orders", auth, createOrder);

//get order items
orderRouter.get("/api/orders", auth, getOrder);

//delete order items
orderRouter.delete("/api/delete-order/:id", auth, deleteOrder)

module.exports = orderRouter;


