import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  const allProducts = await Product.find({});
  res.status(200).json({
    noOfProducts: allProducts.length,
    products: allProducts,
  });
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(201).json({ msg: "failed" });
  }
};
