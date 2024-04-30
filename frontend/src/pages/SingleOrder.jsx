import { useGetSingleOrderQuery } from "@/store/api/orderApi";
import { useParams } from "react-router-dom";

const SingleOrder = () => {
  const { orderId } = useParams();
  const { data } = useGetSingleOrderQuery(orderId);
  console.log(data);
  return <div>SingleOrder {orderId}</div>;
};

export default SingleOrder;
