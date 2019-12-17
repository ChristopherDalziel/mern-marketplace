import React from "react";
import { Segment } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { parseCookies } from "nookies";
import axios from "axios";
import cookie from "js-cookie";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

function Cart({ products, user }) {
  // Allowing us to update the 'state' of our cart 
  const [cartProducts, setCartProducts] = React.useState(products)
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  async function handleRemoveFromCart(productId) {
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get('token')
    const payload = {
      params: {productId},
      headers: {Authorization: token}
    }
    const response = await axios.delete(url, payload)
    setCartProducts(response.data)
  }

  // What happens after the payment details have been added into stripe
  async function handleCheckout(paymentData) {
    try {
      setLoading(true)
      const url = `${baseUrl}/api/checkout`
      const token = cookie.get('token')
      const payload = {paymentData}
      const headers = {headers: { Authorization: token}}
      axios.post(url, payload, headers)
      setSuccess(true)
    } catch (error) {
      // Showing the browser defined alert window upon error
      catchErrors(error, window.alert)

    } finally {
      setLoading(false)
    }
    
  }

  return (
    // loading inside Segment shows a loading spinner while we check the users card details
    <Segment loading={loading}>
      <CartItemList 
        // Dynamically update your cart depedent on cartProducts and removeFromCart
        handleRemoveFromCart={handleRemoveFromCart} 
        user={user} 
        products={cartProducts} 
        success={success} 
      />
      <CartSummary 
        products={cartProducts} 
        handleCheckout={handleCheckout}
        success={success} 
      />
    </Segment>
  );
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }
  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);
  // console.log(response.data)
  return { products: response.data };
};

export default Cart;
