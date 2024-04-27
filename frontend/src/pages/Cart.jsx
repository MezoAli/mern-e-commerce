import Metadata from "@/components/layout/Metadata";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cartSlice);

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
            <CartItems cartItems={cartItems} />
            <CartSummary cartItems={cartItems} />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
