import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHnadler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const createOrder = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id;
  const order = await Order.create(req.body);
  res.status(201).json({ order });
});

export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findOne({
    _id: id,
    user: req.user._id,
  });
  if (!order) {
    return next(new ErrorHandler(`no order found with that id: ${id}`));
  }
  res.status(201).json({ order });
});

export const getAllOrdersForUser = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  res.status(201).json({ noOfOrders: orders.length, orders });
});

export const getAllOrdersForAdmin = catchAsyncErrors(async (req, res, next) => {
  const searchOptions = {};
  const id = req.query.id;
  if (id) {
    searchOptions._id = id;
  }

  const orders = await Order.find(searchOptions);

  res.status(201).json({ noOfOrders: orders.length, orders });
});

export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!order) {
    return next(new ErrorHandler(`no order found with that id: ${id}`));
  }

  res.status(201).json({ order });
});

export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`no order found with that id: ${id}`));
  }

  res.status(201).json({ msg: "order deleted successfully" });
});
