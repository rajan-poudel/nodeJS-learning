const meta = require("../middlewares/common");
const Order = require("../models/order_model");

const createOrder = async (req, res) => {
  try {
    const { orderItems, shppingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ error: "their is no order Items" });
    } else {
      const order = new Order({
        orderItems,
        shppingAddress,
        paymentMethod,
      });

      createOrder = await order.save();
      res.status(200).json({ meta, order});
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = createOrder;
