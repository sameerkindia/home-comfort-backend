const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "must have a company name"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "product must have a name"],
    trim: true,
  },
  featured: { type: Boolean, default: false },
  price: { type: Number, required: [true, "product must have a price"] },
  image: { type: String },
  createdAt: { type: Date, default: Date.now(), select: false },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
