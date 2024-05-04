import order from "../models/order.js";
import { getDatesBetween } from "./getDatesBetween.js";

export const getSales = async (startDate, endDate) => {
  const orders = await order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        sales: {
          $sum: "$itemsPrice",
        },
        orders: {
          $sum: 1,
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const salesMap = new Map();
  let totalSales = 0;
  let totalOrders = 0;

  orders.forEach((entry) => {
    const date = entry?._id;
    const sales = entry?.sales;
    const orders = entry?.orders;

    salesMap.set(date, { orders, sales });
    totalSales += sales;
    totalOrders += orders;
  });

  const dates = getDatesBetween(startDate, endDate);

  const finalSalesResults = dates?.map((date) => {
    return {
      date,
      sales: (salesMap.get(date) || { sales: 0 }).sales,
      orders: (salesMap.get(date) || { orders: 0 }).orders,
    };
  });

  return {
    totalOrders,
    totalSales,
    finalSalesResults,
  };
};
