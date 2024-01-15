const express = require("express");
const Mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();
const port = 7000;

app.use(express.json());

app.use("/", productRoutes);

Mongoose.connect(
  `mongodb+srv://sameerkhanmm355:2VbLBAiBhVg0l8L2@home-comfort.c49pkkq.mongodb.net/store?retryWrites=true&w=majority`
)
  .then(() => {
    app.listen(port, () => {
      console.log("your server is live");
    });
  })
  .catch(() => {
    console.log("somthing went wrong");
  });
