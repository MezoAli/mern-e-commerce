import User from "../models/user.js";
import ErrorHandler from "../utils/errorHnadler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

export const isAdmin = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler(
        "no authenticated, please login first to access this resource",
        401
      )
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (user.role === "user") {
    return next(
      new ErrorHandler("not authorized, only admin can add products", 401)
    );
  }

  next();
});
