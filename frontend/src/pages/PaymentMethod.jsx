import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { calculateCartAmounts } from "@/lib/calculateCartAmounts";
import { useCreateOrderMutation } from "@/store/api/orderApi";
import { removeTotalCartItems } from "@/store/slices/cartSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const PaymentMethod = () => {
  const [payment, setPayment] = useState("");
  const { shippingInfo, cartItems } = useSelector((state) => state.cartSlice);
  const { cartTotal, totalAmount, shippingAmount, taxAmount } =
    calculateCartAmounts(cartItems);
  const dispatch = useDispatch();

  const [create, { isError, isSuccess, error, isLoading }] =
    useCreateOrderMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (payment === "COD") {
      const data = {
        shippingInfo,
        orderItems: cartItems,
        paymentMethod: payment,
        itemsPrice: cartTotal,
        taxAmount,
        shippingAmount,
        totalAmount,
      };
      create(data);
      dispatch(removeTotalCartItems());
    }
    if (payment === "Card") {
      alert("card");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Created Successfully");
      // navigate("/");
    }
  }, [isError, isSuccess]);
  return (
    <form
      className="flex flex-col gap-10 shadow-lg p-5 max-w-xl mx-auto"
      onSubmit={submitHandler}
    >
      <h2 className="text-2xl font-bold">Choose Payment Method</h2>
      <RadioGroup
        defaultValue={payment}
        onValueChange={(e) => setPayment(e)}
        required
      >
        <div className="flex justify-start items-center gap-4">
          <RadioGroupItem
            value={"COD"}
            id={"COD"}
            className="text-orange-500"
          />
          <Label htmlFor={"COD"} className="text-xl font-semibold">
            Payment On Delivery
          </Label>
        </div>
        <div className="flex justify-start items-center gap-4">
          <RadioGroupItem
            value={"Card"}
            id={"Card"}
            className="text-orange-500"
          />
          <Label htmlFor={"Card"} className="text-xl font-semibold">
            Card - MasterCard or Visa
          </Label>
        </div>
      </RadioGroup>
      <Button variant="auth" disabled={isLoading}>
        {isLoading ? "Creating..." : "Continue"}
      </Button>
    </form>
  );
};

export default PaymentMethod;
