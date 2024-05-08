import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHnadler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

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
  const filteredProducts = await Product.find(searchObject);
  const allProducts = await Product.find(searchObject)
    .limit(productsPerPage)
    .skip(skip);
  res.status(200).json({
    filteredProductsCount: filteredProducts.length,
    productsPerPage,
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
  const product = await Product.findById(id).populate("reviews.user");
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
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const images = product?.images;
  if (images?.length > 0) {
    await Promise.all(
      images.map(async (image) => {
        await deleteImage(image?.public_id);
      })
    );
  }

  await product.deleteOne();

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

export const getAllReviewsForProduct = catchAsyncErrors(
  async (req, res, next) => {
    const product = await Product.findById(req.params.productId).populate(
      "reviews.user",
      "name email"
    );
    if (!product) {
      return next(new ErrorHandler("there is no Product for that Id", 404));
    }
    res.status(200).json({ reviews: product.reviews });
  }
);

export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, reviewId } = req.query;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product.reviews = product.reviews.filter(
    (r) => r._id.toString() !== reviewId.toString()
  );

  product.numOfReviews = product.reviews.length;

  product.ratings =
    product.reviews.length === 0
      ? 0
      : product.reviews.reduce((acc, r) => r.rating + acc, 0) /
        product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(201).json({ message: "review deleted Successfully" });
});

export const getAllProductsForAdmin = catchAsyncErrors(
  async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({ products });
  }
);

export const uploadProductImages = catchAsyncErrors(async (req, res, next) => {
  const productId = req?.params?.productId;
  const images = req?.body;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const imagesArray = [];
  await Promise.all(
    images.map(async (image) => {
      const result = await uploadImage(image, "mezo-shopping/products");
      imagesArray.push({ url: result?.url, public_id: result?.public_id });
      return result;
    })
  );

  product.images.push(...imagesArray);

  await product.save({ validateBeforeSave: false });

  res.status(201).json({ message: "Images uploaded successfully" });
});

export const deleteProductImage = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.productId);

  const imagePublic_id = req?.body?.publicId;
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await deleteImage(imagePublic_id);

  product.images = product?.images?.filter(
    (image) => image?.public_id !== imagePublic_id
  );

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ message: "image deleted Successfully" });
});
