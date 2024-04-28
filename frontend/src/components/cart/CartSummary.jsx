import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { calculateCartAmounts } from "@/lib/calculateCartAmounts";

const CartSummary = ({ cartItems, tax }) => {
  const { cartTotal, cartTotalItems, shippingAmount, taxAmount } =
    calculateCartAmounts(cartItems);
  return (
    <div className="shadow-lg p-5 flex flex-col gap-3 items-center justify-center md:ml-6 md:w-[300px]">
      <h3 className="text-2xl font-bold">Order Summary</h3>
      <hr />
      <div className="flex justify-between gap-8 items-center font-semibold">
        <p>Units : </p>
        <span>{cartTotalItems} Units</span>
      </div>
      <div className="flex justify-between gap-8 items-center font-semibold">
        <p>Est Total : </p>
        <span>{cartTotal} $</span>
      </div>
      <hr />
      {tax && (
        <>
          <div className="flex justify-between gap-8 items-center font-semibold">
            <p>Shipping : </p>
            <span>{shippingAmount} $</span>
          </div>
          <hr />
        </>
      )}
      {tax && (
        <>
          <div className="flex justify-between gap-8 items-center font-semibold">
            <p>Taxes : </p>
            <span>{taxAmount} $</span>
          </div>
          <hr />
        </>
      )}
      {tax && (
        <>
          <div className="flex justify-between gap-8 items-center font-semibold">
            <p className="text-xl font-bold">Total : </p>
            <span>
              {Number(cartTotal) + Number(taxAmount) + Number(shippingAmount)} $
            </span>
          </div>
          <hr />
        </>
      )}
      <Button variant="auth" className="w-full">
        <Link to={`${tax ? "/payment_method" : "/shipping"}`}>
          {tax ? "Proceed To Payment" : "CheckOut"}
        </Link>
      </Button>
    </div>
  );
};

export default CartSummary;
