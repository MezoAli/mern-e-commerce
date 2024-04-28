export const calculateCartAmounts = (cartItems) => {
  const cartTotal = +cartItems
    .reduce((acc, item) => item?.price * item?.quantity + acc, 0)
    .toFixed(2);

  const cartTotalItems = cartItems.reduce(
    (acc, item) => item?.quantity + acc,
    0
  );

  const taxAmount = +Math.ceil(cartTotal * 0.14).toFixed(2);

  const shippingAmount = cartTotal >= 500 ? 0 : 10;

  const totalAmount =
    Number(cartTotal) + Number(taxAmount) + Number(shippingAmount);

  return {
    cartTotal,
    cartTotalItems,
    taxAmount,
    shippingAmount,
    totalAmount,
  };
};
