const meta = require("../middlewares/common");
const Product = require("../models/product");


const response = (req, res, data) => {
  // Retrieve query parameters for pagination
  const currentPage = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;

  // // Sort the data based on createdAt property
  const sortedData = data.sort((a, b) => a.createdAt - b.createdAt);

  // Calculate pagination values
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const results = sortedData.slice(startIndex, endIndex);

  res.status(200).json({
    meta:meta,
    data: results,
    currentPage,
    limit: pageSize,
    totalItems,
    totalPages,
    next: currentPage < totalPages ? currentPage + 1 : null,
    previous: currentPage > 1 ? currentPage - 1 : null,
  });
};

const postProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      quantity,
      price,
      category,
      countInStock,
    } = req.body;

    let product = new Product({
      name,
      description,
      image,
      quantity,
      price,
      category,
      countInStock,
    });

    product = await product.save();
    res.status(200).json({meta, product });
    // response(req, res, product);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    /// to remove [__v] key
    const results = products
      .map((product) => product.toObject())
      .map(({ ["__v"]: _, ...rest }) => rest);

    //another method
    //  const results= products.map(product => {
    //     return {
    //     "name":product.name,
    //     "description": product.description,
    //     }
    //   })

    response(req, res, results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Delete the product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    let product = await Product.findByIdAndDelete(id);
    res.status(200).json({meta, product });

    // response(req, res, product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { postProduct, getProduct, deleteProduct };
