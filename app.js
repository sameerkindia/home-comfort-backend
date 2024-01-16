const express = require("express");
const Mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

require("dotenv").config();

const app = express();
const port = port || 7000;

console.log(process.env.PORT);

app.use(express.json());

app.use("/api/v1/products", productRoutes);

Mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("your server is live");
    });
  })
  .catch(() => {
    console.log("somthing went wrong");
  });
