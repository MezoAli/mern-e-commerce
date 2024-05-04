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
} from "../contollers/products.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = express.Router();

router.get("/products", getAllProducts);
router.post("/admin/products", isAuthenticated, isAdmin, createProduct);
router.get("/admin/products", isAuthenticated, isAdmin, getAllProductsForAdmin);
router.get("/products/:id", getSingleproduct);
router.patch("/admin/products/:id", isAuthenticated, isAdmin, updateProduct);
router.delete("/admin/products/:id", isAuthenticated, isAdmin, deleteProduct);

router.put("/products/reviews", isAuthenticated, createReview);
router.get("/products/reviews/:productId", getAllReviewsForProduct);
router.delete("/products/reviews", isAdmin, deleteReview);

export default router;
