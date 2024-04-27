import Metadata from "@/components/layout/Metadata";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  increaseProductCartQuantity,
  decreaseProductCartQuantity,
  removeItemFromCart,
} from "@/store/slices/cartSlice";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const cartTotal = cartItems
    .reduce((acc, item) => item?.price * item?.quantity + acc, 0)
    .toFixed(2);

  const cartTotalItems = cartItems.reduce(
    (acc, item) => item?.quantity + acc,
    0
  );

  return (
    <div className="max-w-5xl mx-auto ">
      <Metadata title="Your Cart" />
      {cartItems.length === 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center my-10">
          <p className="text-2xl text-centerfont-bold capitalize">
            your cart is empty
          </p>
          <Button variant="auth" className="w-max">
            <Link to="/">Shop Now</Link>
          </Button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-8">
            Cart Items : {cartItems.length} Items
          </h2>
          <div className="flex flex-col md:flex-row">
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
                        <Link to={`/products/${item?.product}`}>
                          {item?.name}
                        </Link>
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
                        onClick={() =>
                          dispatch(removeItemFromCart(item?.product))
                        }
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="shadow-lg p-5 flex flex-col gap-5 items-center justify-center md:ml-6 md:w-[300px]">
              <h3 className="text-2xl font-bold">Order Summary</h3>
              <hr />
              <div className="flex justify-between gap-8 items-center font-semibold">
                <p>Units : </p>
                <span>{cartTotalItems} Units</span>
              </div>
              <div className="flex justify-between gap-8 items-center font-semibold">
                <p>Est Total : </p>
                <span>{cartTotal} $</span>
              </div>
              <hr />
              <Button variant="auth" className="w-full">
                <Link to="/shipping">CheckOut</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
