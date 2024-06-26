import Metadata from "@/components/layout/Metadata";
import OrdersTable from "@/components/order/OrdersTable";
import { Button } from "@/components/ui/button";
import { useGetAllOrdersForUserQuery } from "@/store/api/orderApi";
import { removeTotalCartItems } from "@/store/slices/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

const Orders = () => {
  const { data } = useGetAllOrdersForUserQuery();
  const [searchParams] = useSearchParams();
  const isPaymentSuccessful = searchParams.get("payment_success");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isPaymentSuccessful) {
      dispatch(removeTotalCartItems());
    }
  }, [isPaymentSuccessful]);
  return (
    <>
      <Metadata title="your orders" />
      {data?.orders?.length === 0 && (
        <div className="flex flex-col gap-6 justify-center items-center capitalize">
          <p className="text-xl font-bold">you do not have any orders</p>
          <Button variant="auth">
            <Link to="/">Shop Now</Link>
          </Button>
        </div>
      )}
      {data?.orders?.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 capitalize">your orders</h3>
          <OrdersTable orders={data?.orders} />
        </div>
      )}
    </>
  );
};

export default Orders;
