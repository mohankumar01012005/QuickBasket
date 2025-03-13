const express = require("express");
const Product = require("../modals/Product");
const User = require("../modals/User");

const router = express.Router();

// Create Product (Only Seller)
router.post("/create", async (req, res) => {
  try {
    const { name, description, price, imageUrl, sellerId } = req.body;

    const seller = await User.findById(sellerId);
    if (!seller || seller.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can create products" });
    }

    const product = new Product({ name, description, price, imageUrl, seller: sellerId });
    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Product (Only Seller)
router.put("/update/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, imageUrl, sellerId } = req.body;

    const seller = await User.findById(sellerId);
    if (!seller || seller.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can update products" });
    }

    const product = await Product.findById(productId);
    if (!product || product.seller.toString() !== sellerId) {
      return res.status(403).json({ message: "Unauthorized or product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.imageUrl = imageUrl;
    await product.save();

    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "username");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
