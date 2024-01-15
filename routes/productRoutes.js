const express = require("express");
const productController = require("../controllers/productController");

const productRoutes = express.Router();

productRoutes
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.addProduct);

productRoutes
  .route("/:id")
  .get(productController.getOneProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = productRoutes;
