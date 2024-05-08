import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useUpdateOrderMutation } from "@/store/api/orderApi";
import toast from "react-hot-toast";

const EditOrderForm = ({ order }) => {
  const isPaid = order?.paymentInfo?.status === "paid" ? true : false;
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus);
  const [paymentStatus, setPaymentStatus] = useState(
    order?.paymentInfo?.status
  );

  const [updateOrder, { data, isLoading, isSuccess, isError, error }] =
    useUpdateOrderMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      orderStatus,
      paymentStatus,
    };
    updateOrder({ body, orderId: order?._id });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isError, isSuccess]);

  return (
    <form
      className="flex flex-col gap-4 justify-start items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col justify-start items-start gap-4">
        <h4 className="text-2xl font-bold">Order Details : </h4>
        <table className="w-full text-sm text-left text-gray-500">
          <tbody>
            <tr className="flex justify-between mb-3">
              <th scope="row">Order Id :</th>
              <td className="text-center">{order?._id}</td>
            </tr>
            <tr className="flex justify-between mb-3">
              <th scope="row">Status :</th>
              <td className="text-center">
                <select
                  onChange={(e) => setOrderStatus(e.target.value)}
                  name="order_status"
                  required
                  value={orderStatus}
                  className="bg-gray-50 p-1 border border-gray-300
         text-gray-900 text-sm rounded-lg"
                >
                  {["Processing", "Shipped", "Delivered"].map((c) => {
                    return (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr className="flex justify-between">
              <th scope="row">Date :</th>
              <td className="text-center">
                {new Date(order?.createdAt).toLocaleDateString()} -{" "}
                {new Date(order?.createdAt).toLocaleTimeString()}
              </td>
            </tr>
          </tbody>
        </table>

        <hr />
      </div>
      <div className="flex w-full flex-col justify-start items-start gap-4">
        <h4 className="text-2xl font-bold">Shipping Info : </h4>
        <table className="w-full text-sm text-left text-gray-500">
          <tbody>
            <tr className="flex justify-between">
              <th scope="row">Name:</th>
              <td className="text-center">{order?.user?.name}</td>
            </tr>
            <tr className="flex justify-between">
              <th scope="row">Phone:</th>
              <td className="text-center">{order?.shippingInfo?.phoneNo}</td>
            </tr>
            <tr className="flex justify-between">
              <th scope="row">Address:</th>
              <td className="text-center">
                {order?.shippingInfo?.address}, {order?.shippingInfo?.city},
                {order?.shippingInfo?.country}
              </td>
            </tr>
          </tbody>
        </table>

        <hr />
      </div>
      <div className="flex w-full flex-col justify-start items-start gap-4">
        <h4 className="text-2xl font-bold">Payment Info : </h4>
        <table className="w-full text-sm text-left text-gray-500">
          <tbody>
            <tr className="flex justify-between mb-3">
              <th scope="row">Status:</th>
              <td
                className={`text-center ${
                  isPaid ? "text-green-500" : "text-red-500"
                }`}
              >
                <select
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  required
                  value={paymentStatus}
                  className="bg-gray-50 p-1 border border-gray-300 text-gray-900 text-sm rounded-lg"
                >
                  {["paid", "not-paid"].map((c) => {
                    return (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr className="flex justify-between">
              <th scope="row">Method:</th>
              <td className="text-center">{order?.paymentMethod}</td>
            </tr>
            <tr className="flex justify-between">
              <th scope="row">Amount Paid:</th>
              <td className="text-center">{(order?.totalAmount).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="my-5" />
      <div className="flex w-full flex-col gap-4">
        <h4 className="text-2xl font-bold">Order Items : </h4>
        <div className="flex flex-col gap-6">
          {order?.orderItems.map((item) => {
            return (
              <div
                key={item?._id}
                className="flex w-full justify-between gap-4 items-center"
              >
                <img alt={item?.name} src={item?.image} className="w-24 h-24" />
                <Button variant="link">
                  <Link
                    className="text-slate-500 text-sm"
                    to={`/products/${item?.product}`}
                  >
                    {item?.name}
                  </Link>
                </Button>
                <p>$ {item?.price}</p>
                <p>{item?.quantity}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        variant="auth"
        type="submit"
        className="w-[50%] my-4"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </form>
  );
};

export default EditOrderForm;
