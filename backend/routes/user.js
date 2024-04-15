import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  forgetPassword,
} from "../contollers/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forget", forgetPassword);

export default router;
