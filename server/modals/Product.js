const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Explicit id field
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model("Product", ProductSchema);
