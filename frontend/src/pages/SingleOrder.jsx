import Loading from "@/components/layout/Loading";
import NotFound from "@/components/layout/NotFound";
import OrderDetails from "@/components/order/OrderDetails";
import { useGetSingleOrderQuery } from "@/store/api/orderApi";
import { useParams } from "react-router-dom";

const SingleOrder = () => {
  const { orderId } = useParams();
  const { data, isLoading, isError, error } = useGetSingleOrderQuery(orderId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error?.status === 404) {
    return <NotFound />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <OrderDetails order={data?.order} />
    </div>
  );
};

export default SingleOrder;
