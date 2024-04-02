import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleproduct,
} from "../contollers/products.js";
const router = express.Router();

router.get("/products", getAllProducts);
router.post("/admin/products", createProduct);
router.get("/products/:id", getSingleproduct);

export default router;
