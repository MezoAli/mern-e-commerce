import express from "express";
import { createOrder } from "../contollers/order.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/order/new", isAuthenticated, createOrder);

export default router;
