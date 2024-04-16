import express from "express";
import { createOrder, getSingleOrder } from "../contollers/order.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/orders/new", isAuthenticated, createOrder);
router.get("/orders/:id", isAuthenticated, getSingleOrder);

export default router;
