import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleproduct,
  updateProduct,
} from "../contollers/products.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.get("/products", isAuthenticated, getAllProducts);
router.post("/admin/products", createProduct);
router.get("/products/:id", getSingleproduct);
router.patch("/admin/products/:id", updateProduct);
router.delete("/admin/products/:id", deleteProduct);

export default router;
