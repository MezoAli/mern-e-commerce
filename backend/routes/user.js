import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  forgetPassword,
  resetPassword,
} from "../contollers/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forget", forgetPassword);
router.post("/password/reset/:resetToken", resetPassword);

export default router;
