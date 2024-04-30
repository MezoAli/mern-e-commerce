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
import { useDispatch } from "react-redux";

const OrdersTable = ({ orders }) => {
  const dispatch = useDispatch();
  return (
    <Table className="w-full col-span-1 md:col-span-3">
      <TableCaption>A list of your orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[130px]">Order Id</TableHead>
          <TableHead>Amount Paid</TableHead>
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
            <TableCell>{item?.orderStatus}</TableCell>
            <TableCell className="font-bold">
              <Button variant="link">
                <Link to={`/products/${item?.product}`}>{item?.name}</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
