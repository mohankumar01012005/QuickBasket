const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});

module.exports = mongoose.model("Cart", CartSchema);
