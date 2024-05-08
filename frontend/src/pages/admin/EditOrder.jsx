import EditOrderForm from "@/components/admin/EditOrderForm";
import { useGetOrderDetailsForAdminQuery } from "@/store/api/orderApi";
import { useParams } from "react-router-dom";

const EditOrder = () => {
  const { orderId } = useParams();
  const { data, isLoading, error } = useGetOrderDetailsForAdminQuery(orderId);

  if (isLoading) {
    return <p className="text-center text-2xl font-bold my-8">Loading...</p>;
  }

  if (!data?.order) {
    return (
      <p className="text-center text-red-500 font-bold text-3xl">
        {error?.data?.message}
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <h3 className="text-2xl font-semibold text-center">Update Order</h3>
      <EditOrderForm order={data?.order} />
    </div>
  );
};

export default EditOrder;
