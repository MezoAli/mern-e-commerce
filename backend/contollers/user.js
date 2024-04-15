import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import ErrorHandler from "../utils/errorHnadler.js";
import sendToken from "../utils/sendToken.js";
import { sendMail } from "../utils/sendEmail.js";
import crypto from "crypto";

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

export const forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) {
    return next(
      new ErrorHandler("email is not found, register to create account", 404)
    );
  }
  const resetToken = user.resetPassword();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendMail({
      email: user.email,
      html: message,
      subject: "Mezo-Shopping Password Recovery",
    });
    res.status(200).json({ msg: "check your mail for reset password link" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetToken = req.params.resetToken;
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedResetToken,
    resetPasswordExpires: { $gte: Date.now() },
  }).select("+password");
  if (!user) {
    return next(
      new ErrorHandler(
        "invalid token or token has been expired, try again",
        404
      )
    );
  }

  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("password dose not match confirm password", 404)
    );
  }

  user.password = password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({ msg: "password has changed successfully" });
});
