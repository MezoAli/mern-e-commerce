import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleproduct,
  updateProduct,
} from "../contollers/products.js";
const router = express.Router();

router.get("/products", getAllProducts);
router.post("/admin/products", createProduct);
router.get("/products/:id", getSingleproduct);
router.patch("/admin/products/:id", updateProduct);

export default router;
