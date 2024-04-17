import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHnadler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const getAllProducts = catchAsyncErrors(async (req, res) => {
  const searchObject = {};
  const keyword = req.query.keyword;
  const category = req.query.category;
  const seller = req.query.seller;
  const page = Number(req.query.page) || 1;
  const priceGreaterThanOrEqual = Number(req.query.priceGTE);
  const priceLowerThanOrEqual = Number(req.query.priceLTE);
  const rating = Number(req.query.rating);
  const productsPerPage = Number(req.query.productsPerPage) || 4;
  const skip = productsPerPage * (page - 1);
  if (keyword) {
    searchObject.name = {
      $regex: keyword,
      $options: "i",
    };
  }
  if (category) {
    searchObject.category = {
      $regex: category,
      $options: "i",
    };
  }
  if (seller) {
    searchObject.seller = {
      $regex: seller,
      $options: "i",
    };
  }
  if (priceGreaterThanOrEqual || priceLowerThanOrEqual) {
    searchObject.price = {
      $gte: priceGreaterThanOrEqual ? priceGreaterThanOrEqual : 0,
      $lte: priceLowerThanOrEqual ? priceLowerThanOrEqual : 10000000,
    };
  }

  if (rating) {
    searchObject.ratings = {
      $gte: rating,
    };
  }
  const allProducts = await Product.find(searchObject)
    .limit(productsPerPage)
    .skip(skip);
  res.status(200).json({
    noOfProducts: allProducts.length,
    currentPage: page,
    products: allProducts,
  });
});

export const createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id;
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

export const createReview = catchAsyncErrors(async (req, res, next) => {
  const { comment, rating, productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviwed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviwed) {
    product.reviews.forEach((r) => {
      if (r.user.toString() === req.user._id.toString()) {
        r.comment = comment;
        r.rating = +rating;
      }
    });
  } else {
    product.reviews.push({ user: req.user._id, comment, rating: +rating });
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, r) => r.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(201).json({ msg: "product review added Successfully" });
});
