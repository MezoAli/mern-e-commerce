import Order from "../models/order.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHnadler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { getDatesBetween } from "../utils/getDatesBetween.js";
import { getSales } from "../utils/getSales.js";

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
  res.status(200).json({ order });
});

export const getSingleOrderForAdmin = catchAsyncErrors(
  async (req, res, next) => {
    const id = req.params.id;
    const order = await Order.findOne({
      _id: id,
    }).populate("user");
    if (!order) {
      return next(new ErrorHandler(`no order found with that id: ${id}`));
    }
    res.status(200).json({ order });
  }
);

export const getAllOrdersForUser = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  res.status(200).json({ orders });
});

export const getAllOrdersForAdmin = catchAsyncErrors(async (req, res, next) => {
  const searchOptions = {};
  const id = req.query.id;
  if (id) {
    searchOptions._id = id;
  }

  const orders = await Order.find(searchOptions).populate("user");

  res.status(200).json({ orders });
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
  order.paymentInfo.status = req.body.paymentStatus;

  await order.save({ validateBeforeSave: false });

  res.status(201).json({ message: "order status updated successfully" });
});

export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`no order found with that id: ${id}`));
  }

  res.status(201).json({ message: "order deleted successfully" });
});

export const getSalesForAdmin = catchAsyncErrors(async (req, res, next) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(23, 59, 59, 999);

  const { totalOrders, totalSales, finalSalesResults } = await getSales(
    startDate,
    endDate
  );

  res.status(200).json({ totalOrders, totalSales, finalSalesResults });
});
