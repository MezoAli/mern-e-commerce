import express from "express";
import {
  stripeCheckoutSession,
  stripeWebhook,
} from "../contollers/stripePyament.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/payment/stripe-checkout", isAuthenticated, stripeCheckoutSession);
router.post("/webhook", stripeWebhook);

export default router;
