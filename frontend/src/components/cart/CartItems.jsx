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
import {
  decreaseProductCartQuantity,
  increaseProductCartQuantity,
  removeItemFromCart,
} from "@/store/slices/cartSlice";

const CartItems = ({ cartItems }) => {
  const dispatch = useDispatch();
  return (
    <Table className="w-full col-span-1 md:col-span-3">
      <TableCaption>A list of your cart items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[130px]">Image</TableHead>
          <TableHead className="text-center">Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems?.map((item) => (
          <TableRow key={item?.product}>
            <TableCell>
              <img alt={item?.name} src={item?.image} />
            </TableCell>
            <TableCell className="font-bold">
              <Button variant="link">
                <Link to={`/products/${item?.product}`}>{item?.name}</Link>
              </Button>
            </TableCell>
            <TableCell className="font-bold">{item?.price}</TableCell>
            <TableCell className="flex justify-center items-center gap-3 pt-[30px]">
              <Button
                disabled={item?.quantity === item?.stock}
                onClick={() =>
                  dispatch(increaseProductCartQuantity(item?.product))
                }
              >
                +
              </Button>
              <p>{item?.quantity}</p>
              <Button
                disabled={item?.quantity === 1}
                onClick={() =>
                  dispatch(decreaseProductCartQuantity(item?.product))
                }
              >
                -
              </Button>
            </TableCell>
            <TableCell className="font-bold">
              $ {(item?.quantity * item?.price).toFixed(2)}
            </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                onClick={() => dispatch(removeItemFromCart(item?.product))}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CartItems;
