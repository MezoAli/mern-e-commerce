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
import { Edit2Icon, ImageIcon, Trash2Icon } from "lucide-react";
import { memo } from "react";

const ProductsTable = ({ products }) => {
  return (
    <>
      <Table className="w-full col-span-1 md:col-span-3">
        <TableCaption>A list of your products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">Product Id</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((item) => (
            <TableRow key={item?._id}>
              <TableCell className="font-bold">
                <Button variant="link">
                  <Link to={`/products/${item?._id}`}>{item?._id}</Link>
                </Button>
              </TableCell>
              <TableCell>{item?.name}</TableCell>

              <TableCell>{item?.stock}</TableCell>
              <TableCell className="font-bold flex justify-center items-center gap-2">
                <Button variant="outline" className="text-green-500">
                  <Link to={`/admin/dashboard/products/${item?._id}`}>
                    <Edit2Icon />
                  </Link>
                </Button>
                <Button variant="outline" className="text-blue-500">
                  <Link to={`/orders/${item?._id}`}>
                    <ImageIcon />
                  </Link>
                </Button>
                <Button variant="outline" className="text-red-500">
                  <Link to={`/orders/invoice/${item?._id}`}>
                    <Trash2Icon />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default memo(ProductsTable);
