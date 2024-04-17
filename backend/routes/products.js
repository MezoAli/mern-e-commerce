import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleproduct,
  updateProduct,
  createReview,
} from "../contollers/products.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = express.Router();

router.get("/products", getAllProducts);
router.post("/admin/products", isAuthenticated, isAdmin, createProduct);
router.get("/products/:id", getSingleproduct);
router.patch("/admin/products/:id", isAuthenticated, isAdmin, updateProduct);
router.delete("/admin/products/:id", isAuthenticated, isAdmin, deleteProduct);

router.put("/products/reviews", isAuthenticated, createReview);

export default router;
