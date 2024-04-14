import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleproduct,
  updateProduct,
} from "../contollers/products.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = express.Router();

router.get("/products", isAuthenticated, getAllProducts);
router.post("/admin/products", isAdmin, createProduct);
router.get("/products/:id", getSingleproduct);
router.patch("/admin/products/:id", isAdmin, updateProduct);
router.delete("/admin/products/:id", isAdmin, deleteProduct);

export default router;
