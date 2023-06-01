const response = (req, res, data) => {
  
    res.status(200).json({
    
      data: data,
    });
  };


const postProduct = async (req, res) => {
  try {
    const { name, description, image, quantiy, price, category } = res.body;

    let product = new Product({
      name,
      description,
      image,
      quantiy,
      price,
      category,
    });

    product = await product.save();
    await response(req,res,product);
    // res.json({product});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
