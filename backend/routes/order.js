import express from "express";
import {
  createOrder,
  getAllOrdersForAdmin,
  getAllOrdersForUser,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getSingleOrderForAdmin,
  getSalesForAdmin,
} from "../contollers/order.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/orders/new", isAuthenticated, createOrder);
router.get("/orders/:id", isAuthenticated, getSingleOrder);
router.get("/orders", isAuthenticated, getAllOrdersForUser);
router.get("/admin/orders", isAdmin, getAllOrdersForAdmin);
router.get("/admin/get_sales", isAdmin, getSalesForAdmin);
router.get("/admin/orders/:id", isAdmin, getSingleOrderForAdmin);
router.put("/admin/orders/:id", isAdmin, updateOrder);
router.delete("/admin/orders/:id", isAdmin, deleteOrder);

export default router;
