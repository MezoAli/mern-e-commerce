import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="flex flex-col justify-center items-start gap-12">
      <div className="flex justify-center items-center gap-6">
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
        <Button variant="auth">Fetch</Button>
      </div>
      <div className="flex w-full justify-between items-center">
        <div
          className="bg-green-500 rounded-lg py-6 flex
         justify-center items-center flex-col font-bold text-xl w-[45%]"
        >
          <h3>Sales</h3>
          <p>$ 00</p>
        </div>
        <div
          className="bg-red-500 rounded-lg py-6 flex justify-center
         items-center flex-col font-bold text-xl w-[45%]"
        >
          <h3>Orders</h3>
          <p>0</p>
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
