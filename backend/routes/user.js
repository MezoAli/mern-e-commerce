import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../contollers/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/reset-password", resetPassword);

export default router;
