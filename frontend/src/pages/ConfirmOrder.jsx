import Metadata from "@/components/layout/Metadata";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";

const Cart = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="max-w-5xl mx-auto ">
      <Metadata title="Confirm Order" />
      {cartItems.length === 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center my-10">
          <p className="text-2xl text-centerfont-bold capitalize">
            you don't have any orders
          </p>
          <Button variant="auth" className="w-max">
            <Link to="/">Shop Now</Link>
          </Button>
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-semibold mb-8">
              Your shipping info :
            </h2>
            <div className=" my-4 ml-4 flex start items-center gap-6">
              <h3 className="text-xl font-semibold">Name :</h3>
              <p className="text-slate-400 font-semibold">{user?.name}</p>
            </div>
            <div className=" my-4 ml-4 flex start items-center gap-6">
              <h3 className="text-xl font-semibold">Address :</h3>
              <address className="text-slate-400 font-semibold">
                {shippingInfo?.address}
              </address>
            </div>
            <div className=" my-4 ml-4 flex start items-center gap-6">
              <h3 className="text-xl font-semibold">Phone Number :</h3>
              <p className="text-slate-400 font-semibold">
                {shippingInfo?.phoneNo}
              </p>
            </div>
            <div className=" my-4 ml-4 flex start items-center gap-6">
              <h3 className="text-xl font-semibold">City :</h3>
              <p className="text-slate-400 font-semibold">
                {shippingInfo?.city}
              </p>
            </div>
            <div className=" my-4 ml-4 flex start items-center gap-6">
              <h3 className="text-xl font-semibold">Country :</h3>
              <p className="text-slate-400 font-semibold">
                {shippingInfo?.country}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <CartItems cartItems={cartItems} tax />
            <CartSummary cartItems={cartItems} tax />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
