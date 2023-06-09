const meta = require("../middlewares/common");
const Order = require("../models/order_model");

const createOrder = async (req, res) => {
  try {
    const { orderItems, shppingAddress, paymentMethod,totalTax, totalPrice,shippingPrice } = req.body;
  
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ error: "their is no order Items" });
    } else {
      let order = new Order({
        orderItems,
        shppingAddress,
        paymentMethod,
        totalTax,
        totalPrice,
        shippingPrice
      });

    const  createOrders = await order.save();
      res.status(200).json({ meta, data:createOrders});
    }
  } catch (err) {
    return res.status(500).json({ error: err.message,statusCode:500 });
  }
};

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({}).populate({path:"orderItems",select:["name","price","quantity","countInStock"]});
    /// to remove [__v] key
    const results = orders
      .map((order) => order.toObject())
      .map(({ ["__v"]: _, ...rest }) => rest);

      res.status(200).json({ meta, data:results});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {createOrder,getOrder};
