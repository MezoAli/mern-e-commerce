import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ user, msg: "user created successfully" });
});
