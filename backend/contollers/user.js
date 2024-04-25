import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import ErrorHandler from "../utils/errorHnadler.js";
import sendToken from "../utils/sendToken.js";
import { sendMail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  await User.create(req.body);
  res.status(201).json({ message: "user created successfully" });
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

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

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

  res.status(200).json({ message: "password has changed successfully" });
});

export const getCurrentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    new ErrorHandler("please login first to access this resource", 404);
  }
  res.status(200).json({ user });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("please login first to access this resource", 404)
    );
  }

  const oldPassword = req.body.oldPassword;
  const isMatchedPassword = await user.comparePassword(oldPassword);

  if (!isMatchedPassword) {
    return next(
      new ErrorHandler("your old password is incorrect, please try again", 404)
    );
  }

  if (req.body.newPassword.length < 5) {
    return next(
      new ErrorHandler("password should be atleast 6 charcters", 400)
    );
  }

  user.password = req.body.newPassword;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({ message: "password updated successfully" });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;
  if (name.trim() === "") {
    return next(new ErrorHandler("please enter a name", 400));
  }
  if (name.trim().length < 3) {
    return next(new ErrorHandler("name cannot be less than 3 characters", 400));
  }
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: false,
  });

  if (!user) {
    return next(
      new ErrorHandler("please login first to access this resource", 404)
    );
  }

  res.status(201).json({ user });
});

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const email = req.query.email;
  const name = req.query.name;
  const role = req.query.role;
  const id = req.query.id;
  const searchOptions = {};
  if (email) {
    searchOptions.email = {
      $regex: email,
      $options: "i",
    };
  }
  if (name) {
    searchOptions.name = {
      $regex: name,
      $options: "i",
    };
  }
  if (role) {
    searchOptions.role = role;
  }
  if (id) {
    searchOptions._id = id;
  }
  const users = await User.find(searchOptions);
  res.status(200).json({ noOfUsers: users.length, users });
});

export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
  });

  res.status(201).json({ user });
});

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({ msg: `user with email : ${user.email} deleted successfully` });
});

export const uploadFileController = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  if (user?.avatar?.url) {
    await deleteImage(user?.avatar?.public_id);
  }
  const result = await uploadImage(req.body.avatar, "mezo-shopping/avatars");

  user.avatar.public_id = result.public_id;
  user.avatar.url = result.url;

  await user.save({ validateBeforeSave: false });

  res.status(201).json({ message: `image uploaded successfully` });
});
