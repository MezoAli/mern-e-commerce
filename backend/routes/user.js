import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  forgetPassword,
  resetPassword,
  getCurrentUser,
  updatePassword,
  updateProfile,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../contollers/user.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.post("/password/forget", forgetPassword);
router.put("/password/reset/:resetToken", resetPassword);
router.put("/password/update", isAuthenticated, updatePassword);

router.get("/me", isAuthenticated, getCurrentUser);
router.put("/me", isAuthenticated, updateProfile);

router.get("/admin/users", isAdmin, getAllUsers);
router.put("/admin/users/:id", isAdmin, updateUser);
router.delete("/admin/users/:id", isAdmin, deleteUser);

export default router;
