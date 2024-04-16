import express from "express";
import {
  createOrder,
  getAllOrdersForUser,
  getSingleOrder,
} from "../contollers/order.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/orders/new", isAuthenticated, createOrder);
router.get("/orders/:id", isAuthenticated, getSingleOrder);
router.get("/orders", isAuthenticated, getAllOrdersForUser);

export default router;
