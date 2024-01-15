const Product = require("../models/productModel");

exports.getAllProduct = async (req, res) => {
  try {
    // Filter
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      query = query.sort(req.query.sort);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const products = await query;
    res
      .status(200)
      .json({ status: "success", results: products.length, data: products });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ status: "success", data: product });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ status: "success", data: newProduct });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
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

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", message: "Product Deleted" });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};
