import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button, Segment, Divider } from "semantic-ui-react";
import calculateCartTotal from "../../utils/calculateCartTotal";

function CartSummary({ products, handleCheckout, success }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  // Creating to React compontent to disable checkout button
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  // We want this to run every single time the cart is updated
  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    // If the array products is empty, the cart is empty
    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${cartAmount}
        <StripeCheckout 
          name="Mineral Exchange" 
          amount={stripeAmount} 
          // Display an image of the first item in the users cart if there is no item, or no image display an empty string
          image={products.length > 0 ? products[0].product.imageUrl : '' }
          currency="AUD"
          shippingAddress={true}
          billingAddress={true}
          stripeKey="pk_test_hm0vlOj40pdRULjRwvM2C88F00bVGxANtZ"
          zipCode={true}
          token={handleCheckout}
          // When a user clicks on this button, all the above information will be displayed
          triggerEvent="onClick" >

          <Button 
            // Disable if the cart is empty or if a successfuly payment has been made
            disabled={isCartEmpty || success} 
            icon="cart" 
            color="teal" 
            floated="right" 
            content="Checkout" />
        </StripeCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;
