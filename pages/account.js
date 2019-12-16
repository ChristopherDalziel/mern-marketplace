import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';


function Account({user, orders}) {
  return <>
      <AccountHeader {...user} />
      <AccountOrders  orders={orders} />
    </>
}

// Fetching user order data
Account.getInitialProps = async ctx => {
  const {token} = parseCookies(ctx)
  if(!token){
    // If a user somehow makes it to this page that doesn't have a token, display blank
    return {orders: []}
  }
  const payload = {headers: {Authorization: token}}
  const url = `${baseUrl}/api/orders`
  const response = await axios.get(url, payload)
  return response.data;
}

export default Account;
