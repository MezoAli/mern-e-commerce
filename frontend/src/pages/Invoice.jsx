import { useGetSingleOrderQuery } from "@/store/api/orderApi";
import { useParams } from "react-router-dom";

const Invoice = () => {
  const { orderId } = useParams();
  const { data } = useGetSingleOrderQuery(orderId);
  console.log(data);
  return <div>Invoice: {orderId}</div>;
};

export default Invoice;
