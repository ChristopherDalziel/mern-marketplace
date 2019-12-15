import React from 'react';
import { Segment } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import cookie from 'js-cookie';

function Cart({ products, user }) {
  // Allowing us to update the 'state' of our cart 
  const [cartProducts, setCartProducts] = React.useState(products)

  async function removeFromCart(productId) {
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get('token')
    const payload = {
      params: {productId},
      headers: {Authorization: token}
    }
    const response = await axios.delete(url, payload)
    setCartProducts(response.data)
  }

  return (
    <Segment>
      <CartItemList 
        // Dynamically update your cart depedent on cartProducts and removeFromCart
        handleRemoveFromCart={handleRemoveFromCart} 
        user={user} 
        products={cartProducts} />

      <CartSummary products={cartProducts}/>
    </Segment>
  );
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [ ] };
  }
  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);
  console.log(response.data)
  return { products: response.data };
};

export default Cart;
