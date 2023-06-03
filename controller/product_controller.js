const Product = require("../models/product");

const response = (req, res, data) => {
  res.status(200).json({
    data: data,
  });
};

const getProduct = async (req, res) => {
  try {
   const product = await Product.find({ });
    response(req, res, product);
    
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getProductBySearch =  async (req, res) => {
    try {
      
      const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
    });
  
      response(req, res, products);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  

module.exports ={getProduct,getProductBySearch};