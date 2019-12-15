import {Button, Segment, Divider} from "semantic-ui-react";
import React from 'react';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary({products}) {
  const [cartAmount, setCartAmount] = React.useState(0)
  const [stripeAmount, setStripeAmount] = React.useState(0)
  // Creating to React compontent to disable checkout button
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  // We want this to run every single time the cart is updated
  React.useEffect(() => {
    const {cartTotal, stripeTotal} = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    // If the array products is empty, the cart is empty
    setCartEmpty(products.length === 0)
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${cartAmount}
        <Button disabled={isCartEmpty} icon="cart" color="teal" floated="right" content="Checkout" />
      </Segment>
    </>
  );
}

export default CartSummary;
