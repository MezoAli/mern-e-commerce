import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHnadler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const createOrder = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id;
  const order = await Order.create(req.body);
  res.status(201).json({ order });
});
