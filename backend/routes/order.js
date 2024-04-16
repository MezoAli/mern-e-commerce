import express from "express";
import {
  createOrder,
  getAllOrdersForAdmin,
  getAllOrdersForUser,
  getSingleOrder,
} from "../contollers/order.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/orders/new", isAuthenticated, createOrder);
router.get("/orders/:id", isAuthenticated, getSingleOrder);
router.get("/orders", isAuthenticated, getAllOrdersForUser);
router.get("/admin/orders", isAdmin, getAllOrdersForAdmin);

export default router;
