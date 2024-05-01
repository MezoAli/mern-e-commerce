import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const OrderDetails = ({ order }) => {
  const isPaid = order?.paymentInfo?.status === "paid" ? true : false;
  return (
    <div className="flex flex-col gap-4 justify-start items-center">
      <div className="flex w-full justify-between my-5">
        <Button variant="auth">
          <Link to="/orders">Back to Orders</Link>
        </Button>
        <Button>
          <Link>Invoice </Link>
        </Button>
      </div>
      <div className="flex w-full flex-col justify-start items-start gap-4">
        <h4 className="text-2xl font-bold">Order Details : </h4>
        <table className="w-full text-sm text-left text-gray-500">
          <tbody>
            <tr className="flex justify-between">
              <th scope="row">Order Id :</th>
              <td className="text-center">{order?._id}</td>
            </tr>
            <tr className="flex justify-between">
              <th scope="row">Status :</th>
              <td className="text-center">{order?.orderStatus}</td>
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
            <tr className="flex justify-between">
              <th scope="row">Status:</th>
              <td
                className={`text-center ${
                  isPaid ? "text-green-500" : "text-red-500"
                }`}
              >
                {order?.paymentInfo?.status}
              </td>
            </tr>
            <tr className="flex justify-between">
              <th scope="row">Method:</th>
              <td className="text-center">{order?.paymentMethod}</td>
            </tr>
            <tr className="flex justify-between">
              <th scope="row">Amount Paid:</th>
              <td className="text-center">{order?.totalAmount}</td>
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
                <h2 className="text-slate-500 text-sm">{item?.name}</h2>
                <p>$ {item?.price}</p>
                <p>{item?.quantity}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
