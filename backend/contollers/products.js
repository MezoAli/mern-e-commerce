import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHnadler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const getAllProducts = catchAsyncErrors(async (req, res) => {
  const allProducts = await Product.find({});
  res.status(200).json({
    noOfProducts: allProducts.length,
    products: allProducts,
  });
});

export const createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  if (!product) {
    return next(new ErrorHandler("Failed to add product", 500));
  }
  res.status(201).json({ product });
});

export const getSingleproduct = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ product });
});

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ product });
});

export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ msg: "product deleted Successfully" });
});
