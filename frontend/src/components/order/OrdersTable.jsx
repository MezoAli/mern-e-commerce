import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Printer, EyeIcon } from "lucide-react";

const OrdersTable = ({ orders }) => {
  console.log(orders);
  return (
    <Table className="w-full col-span-1 md:col-span-3">
      <TableCaption>A list of your orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[130px]">Order Id</TableHead>
          <TableHead>Amount Paid</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((item) => (
          <TableRow key={item?._id}>
            <TableCell className="font-bold">
              <Button variant="link">
                <Link to={`/orders/${item?._id}`}>{item?._id}</Link>
              </Button>
            </TableCell>
            <TableCell>$ {item?.totalAmount}</TableCell>
            <TableCell
              className={`${
                item?.paymentInfo?.status === "paid"
                  ? "text-green-500 font-bold"
                  : "text-red-500 font-bold"
              }`}
            >
              $ {item?.paymentInfo?.status}
            </TableCell>
            <TableCell>{item?.orderStatus}</TableCell>
            <TableCell className="font-bold flex justify-center items-center gap-2">
              <Button variant="outline" className="text-green-500">
                <Link to={`/products/${item?.product}`}>
                  <EyeIcon />
                </Link>
              </Button>
              <Button variant="outline" className="text-blue-500">
                <Link to={`/products/${item?.product}`}>
                  <Printer />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
