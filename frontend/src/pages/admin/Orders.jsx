import OrdersTable from "@/components/admin/OrdersTable";
import Metadata from "@/components/layout/Metadata";
import { Input } from "@/components/ui/input";
import { useGetAllOrdersForAdminQuery } from "@/store/api/orderApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const { data, isLoading, error, isError } = useGetAllOrdersForAdminQuery();
  const [search, setSearch] = useState("");
  const filteredOrders = data?.orders?.filter((order) => {
    return order?._id.toLowerCase().includes(search);
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) {
    return <p className="text-3xl text-center my-4 font-bold">Loading...</p>;
  }
  return (
    <>
      <Metadata title="Admin Orders" />
      <Input
        type="text"
        placeholder="search by order Id"
        className="my-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {data?.orders?.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 capitalize">
            {filteredOrders.length} Orders
          </h3>
          <OrdersTable orders={filteredOrders} />
        </div>
      )}
    </>
  );
};

export default AdminOrders;
