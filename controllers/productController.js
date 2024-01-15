const Product = require("../models/productModel");

module.exports = getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res
      .status(200)
      .json({ status: "success", results: products.length, data: products });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

module.exports = getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ status: "success", data: product });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

module.exports = addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ status: "success", data: newProduct });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

module.exports = updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    ).setOptions({ returnDocument: "after", runValidators: "true" });

    res.status(200).json({ status: "success", data: updatedProduct });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

module.exports = deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", message: "Product Deleted" });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};
