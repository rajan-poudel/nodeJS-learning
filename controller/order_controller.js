const meta = require("../middlewares/common");
const Order = require("../models/order_model");

const createOrder = async (req, res) => {
  try {
    const { orderItems, shppingAddress, paymentMethod,totalTax, totalPrice,shippingPrice } = req.body;
    let order = new Order({
      // orderItems:orderItems.map(orderItem => {
      //       return {
      //       "name":orderItem.name,
      //       "category": orderItem.category,
      //       "price":orderItem.price,
      //       "quantity":1
      //       }
      //     }),
      orderItems:[],
      shppingAddress,
      paymentMethod,
      totalTax,
      totalPrice,
      shippingPrice
    });

   let createOrders = await order.save();
    res.status(200).json({ meta, createOrders});

    // if (orderItems && orderItems.length === 0) {
    //   return res.status(400).json({ error: "their is no order Items" });
    // } else {
    //   let order = new Order({
    //     orderItems,
    //     shppingAddress,
    //     paymentMethod,
    //     totalTax,
    //     totalPrice,
    //     shippingPrice
    //   });

    //   createOrder = await order.save();
    //   res.status(200).json({ meta, createOrder});
    // }
  } catch (err) {
    return res.status(500).json({ error: err.message,statusCode:500 });
  }
};

module.exports = createOrder;
