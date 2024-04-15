import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  forgetPassword,
  resetPassword,
  getCurrentUser,
  updatePassword,
} from "../contollers/user.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.post("/password/forget", forgetPassword);
router.put("/password/reset/:resetToken", resetPassword);

router.get("/me", isAuthenticated, getCurrentUser);
router.put("/password/update", isAuthenticated, updatePassword);

export default router;
