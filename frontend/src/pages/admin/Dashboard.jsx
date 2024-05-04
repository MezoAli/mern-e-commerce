import SalesChart from "@/components/charts/SalesChart";
import { Button } from "@/components/ui/button";
import { useLazyGetSalesQuery } from "@/store/api/orderApi";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState(0);
  const [getSales, { data, isLoading, error, isSuccess }] =
    useLazyGetSalesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    };
    getSales(params);
  };

  useEffect(() => {
    if (isSuccess) {
      setSales(data?.totalSales);
      setOrders(data?.totalOrders);
    }
  }, [isSuccess, data?.totalSales, data?.totalOrders]);

  return (
    <div className="flex flex-col justify-center items-start gap-12">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-6"
      >
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border rounded-lg p-1"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="border rounded-lg p-1"
          />
        </div>
        <Button variant="auth" disabled={isLoading}>
          {isLoading ? "Fetching..." : "Fetch"}
        </Button>
      </form>
      <div className="flex w-full justify-between items-center">
        <div
          className="bg-green-500 rounded-lg py-6 flex
         justify-center items-center flex-col font-bold text-xl w-[45%]"
        >
          <h3>Sales</h3>
          <p>$ {isLoading ? "Loading" : sales}</p>
        </div>
        <div
          className="bg-red-500 rounded-lg py-6 flex justify-center
         items-center flex-col font-bold text-xl w-[45%]"
        >
          <h3>Orders</h3>
          <p>{isLoading ? "Loading" : orders}</p>
        </div>
      </div>
      <div className="w-full">
        <SalesChart salesData={data?.finalSalesResults} />
      </div>
    </div>
  );
};

export default Dashboard;
