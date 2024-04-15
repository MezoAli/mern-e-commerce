import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHnadler.js";
import sendToken from "../utils/sendToken.js";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ user, msg: "user created successfully" });
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("email is not found, please register first", 404)
    );
  }

  const result = await user.comparePassword(password);

  if (!result) {
    return next(new ErrorHandler("wrong password", 404));
  }

  sendToken(user, 200, res);
});

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ msg: "log out successfully" });
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {});
