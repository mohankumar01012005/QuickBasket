const express = require("express");

const User = require("../modals/User.js")

const router = express.Router();

// Add to wishlist
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  user.wishlist.push(productId);
  await user.save();
  res.json(user.wishlist);
});

// View wishlist
router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId).populate("wishlist");
  res.json(user.wishlist);
});

// Remove from wishlist
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  user.wishlist = user.wishlist.filter(item => item.toString() !== productId);
  await user.save();
  res.json(user.wishlist);
});

module.exports = router;
