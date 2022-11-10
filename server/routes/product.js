const express = require("express");
const productRouter = express.Router();
const auth = require("../middlewares/auth");
const { Product } = require("../models/product");

// /api/products?category=Essentials----req.quesry.category

// api/products:category=Essentials----req.params.category
productRouter.get("/api/products/", auth, async (req, res) => {
  const qCategory = req.query.category;

  try {
    let products;
    if(qCategory){
      products = await Product.find({ category: req.query.category });
    }
    else
       products = await Product.find()
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// create a get request to search products and get them
// /api/products/search/i
// iron pill
productRouter.get("/api/products/search/:name", auth, async (req, res) => {
  try {
    const products = await Product.find({
      // to get search pattern we need this
      name: { $regex: req.params.name, $options: "i" },
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;