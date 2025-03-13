const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const router = express.Router();

// Checkout - Move cart items to orders
router.post("/checkout", async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId).populate("cart");
    if (!user || user.role !== "user") {
      return res.status(403).json({ message: "Only users can checkout" });
    }

    if (user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({ user: userId, products: user.cart });
    await order.save();

    user.orders.push(order._id);
    user.cart = [];
    await user.save();

    res.json({ message: "Checkout successful", order });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
 