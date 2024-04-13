import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHnadler.js";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ user, msg: "user created successfully" });
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email | !password) {
    return next(new ErrorHandler("please provide email and password", 400));
  }
  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new ErrorHandler("email is not found, please register first", 404)
    );
  }

  const result = await user.comparePassword(password);

  if (!result) {
    return next(new ErrorHandler("wrong password", 404));
  }

  const token = user.generateToken();

  res.status(200).json({ token });
});
