import express from "express";
import { createProduct, getAllProducts } from "../contollers/products.js";
const router = express.Router();

router.get("/products", getAllProducts);
router.post("/admin/products", createProduct);

export default router;
