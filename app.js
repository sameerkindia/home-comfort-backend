const express = require("express");
const Mongoose = require("mongoose");

const app = express();
const port = 7000;

app.use(express.json());

const Product = new Mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const newProduct = Mongoose.model("product", Product);

app.get("/", async (req, res) => {
  try {
    const products = await newProduct.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const product = await newProduct.create(req.body);
    res.status(200).json({ product });
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const product = await newProduct.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({ message: "updated" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await newProduct.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

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
