import Order from "../models/order.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHnadler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const createOrder = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id;
  const order = await Order.create(req.body);

  order.orderItems.forEach(async (item) => {
    const product = await Product.findById(item.product.toString());
    if (!product) {
      return next(
        new ErrorHandler(`no product found with that id: ${id}`, 404)
      );
    }

    product.stock = product.stock - item.quantity;

    await product.save({ validateBeforeSave: false });
  });
  res.status(201).json({ order });
});

export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findOne({
    _id: id,
    user: req.user._id,
  }).populate("user");
  if (!order) {
    return next(new ErrorHandler(`no order found with that id: ${id}`));
  }
  res.status(201).json({ order });
});

export const getSingleOrderForAdmin = catchAsyncErrors(
  async (req, res, next) => {
    const id = req.params.id;
    const order = await Order.findOne({
      _id: id,
    });
    if (!order) {
      return next(new ErrorHandler(`no order found with that id: ${id}`));
    }
    res.status(201).json({ order });
  }
);

export const getAllOrdersForUser = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  res.status(201).json({ orders });
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
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`no order found with that id: ${id}`, 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler(`the order is already delivered`, 400));
  }

  order.orderStatus = req.body.orderStatus;

  await order.save({ validateBeforeSave: false });

  res.status(201).json({ msg: "order status updated successfully" });
});

export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`no order found with that id: ${id}`));
  }

  res.status(201).json({ msg: "order deleted successfully" });
});
