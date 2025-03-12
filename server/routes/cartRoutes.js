const express = require("express");
const User = require("../modals/User.js");

const router = express.Router();

// Add to cart
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.cart.push(productId);
  await user.save();
  res.json(user.cart);
});

// View cart
router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId).populate("cart");
  res.json(user.cart);
});

// Remove from cart
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  user.cart = user.cart.filter(item => item.toString() !== productId);
  await user.save();
  res.json(user.cart);
});

module.exports = router;
