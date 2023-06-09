const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderItems: [{ type: mongoose.Types.ObjectId, ref: "product" }],
    shppingAddress: {
      type: String,
      required: true,
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },

    totalTax: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    shippingPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
