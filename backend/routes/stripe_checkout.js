import express from "express";
import { stripeCheckoutSession } from "../contollers/stripePyament.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/payment/stripe-checkout", isAuthenticated, stripeCheckoutSession);

export default router;
