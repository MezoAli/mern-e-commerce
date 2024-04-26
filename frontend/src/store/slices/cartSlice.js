import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItem(state, action) {
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseProductCartQuantity(state, action) {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map((i) => {
        if (i.product === itemId) {
          if (i.quantity === i.stock) {
            return i;
          }
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseProductCartQuantity(state, action) {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map((i) => {
        if (i.product === itemId) {
          return { ...i, quantity: i.quantity - 1 };
        }
        return i;
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export default cartSlice.reducer;

export const {
  setCartItem,
  increaseProductCartQuantity,
  decreaseProductCartQuantity,
  removeItemFromCart,
} = cartSlice.actions;
