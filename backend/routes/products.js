import express from "express";
import { getAllProducts } from "../contollers/products.js";
const router = express.Router();

router.get("/products", getAllProducts);

export default router;
