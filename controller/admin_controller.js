const Product = require("../models/product");

const response = (req, res, data) => {
  
    res.status(200).json({
    
      data: data,
    });
  };


const postProduct = async (req, res) => {
  try {
    const { name, description, image, quantity, price, category } = req.body;

    let product = new Product({
      name,
      description,
      image,
      quantity,
      price,
      category,
    });

    product = await product.save();
     response(req,res,product);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    response(req,res,products)
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {postProduct,getProduct};
