import { Segment } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import {parseCookies} from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

function Cart({products}) {
  console.log(products);
  return (
    <Segment>
      <CartItemList />
      <CartSummary />
    </Segment>
  );
}

Cart.getInitialProps = async ctx => {
  const {token} = parseCookies(ctx)
  // Because the cart is not an authenticated path, we need to ensure the use has a token, if the user doesn't have a token show them an empty cart. **We do this before the get request because there is no point making requests we don't need to
  if (!token){
    return{products: []};
  }
  const url = `${baseUrl}/api/cart`
  const payload = {headers: {Authorization: token}}
  const response = await axios.get(url, payload)
  return {products: response.data}
}

export default Cart;
