import OrderDetails from "@/components/order/OrderDetails";
import { useGetSingleOrderQuery } from "@/store/api/orderApi";
import { useParams } from "react-router-dom";

const SingleOrder = () => {
  const { orderId } = useParams();
  const { data } = useGetSingleOrderQuery(orderId);
  console.log(data?.order);
  return (
    <div className="max-w-2xl mx-auto">
      <OrderDetails order={data?.order} />
    </div>
  );
};

export default SingleOrder;
