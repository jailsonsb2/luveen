const mongoose = require("mongoose");
// const ratingSchema = require("./rating");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  // category:{
  //   type:Array,
  //   required: true,
  // }
//   ratings: [ratingSchema],

// user id who sold it----but here only one admin
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productSchema };