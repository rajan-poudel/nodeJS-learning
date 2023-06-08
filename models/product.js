const mongoose = require("mongoose");
const reviewSchema = require('./review.js')


const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default:0,
  },
  review :[reviewSchema],
  countInStock: {
    type: Number,
    required: true,
    default:1,
  },
  // createdAt: {
  //   type: Date,
  //   required: false,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   required: false,
  //   default: Date.now,
  // },
 
},{
  timestamps: true,

  
}
);

const Product = mongoose.model("Product", productSchema);
module.exports = {Product,productSchema};
