import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleproduct,
  updateProduct,
  createReview,
  getAllReviewsForProduct,
  deleteReview,
  getAllProductsForAdmin,
  uploadProductImages,
  deleteProductImage,
} from "../contollers/products.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = express.Router();

router.get("/products", getAllProducts);
router.post("/admin/products", isAuthenticated, isAdmin, createProduct);
router.get("/admin/products", isAuthenticated, isAdmin, getAllProductsForAdmin);
router.get("/products/:id", getSingleproduct);
router.patch("/admin/products/:id", isAuthenticated, isAdmin, updateProduct);
router.patch(
  "/admin/products/:productId/upload_images",
  isAuthenticated,
  isAdmin,
  uploadProductImages
);
router.patch(
  "/admin/products/:productId/delete_image",
  isAuthenticated,
  isAdmin,
  deleteProductImage
);
router.delete("/admin/products/:id", isAuthenticated, isAdmin, deleteProduct);

router.put("/products/reviews", isAuthenticated, createReview);
router.get("/products/reviews/:productId", getAllReviewsForProduct);
router.delete("/products/reviews", isAdmin, deleteReview);

export default router;
