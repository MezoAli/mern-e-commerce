import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  forgetPassword,
  resetPassword,
  getCurrentUser,
} from "../contollers/user.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.post("/password/forget", forgetPassword);
router.put("/password/reset/:resetToken", resetPassword);

router.get("/me", isAuthenticated, getCurrentUser);

export default router;
