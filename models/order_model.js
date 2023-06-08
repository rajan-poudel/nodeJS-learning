const mongoose = require("mongoose");
const { productSchema } = require("./product");
// const Product = require("./product.js");


const orderSchema = mongoose.Schema({
  orderItems: [productSchema],
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
},{
  timestamps: true,

}
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
