import React from 'react'
import {Input} from 'semantic-ui-react';
import {useRouter} from 'next/router';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import catchErrors from  '../../utils/catchErrors'

function AddProductToCart({user, productId}) {
  const [quantity, setQuantity] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const router = useRouter()

  // When a user adds an item to their cart, display "item added" after 2 seconds change it back to add to cart
  React.useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => setSuccess(false), 2000);
    }
    return () => {
      // Clear timeout function if the user moves away from this page before 2 seconds has passed
      clearTimeout(timeout);
    };
  }, [success]);

  async function handleAddProductToCart(){
    try {
      setLoading(true)
      const url = `${baseUrl}/api/cart`
      const payload = {quantity, productId}
      // Make sure only the current authenticated user can add products to their cart
      const token = cookie.get('token')
      const headers = {headers: {Authorization: token}}
      // Put request because the model already exists
      await axios.put(url, payload, headers)
      setSuccess(true)
    } catch (error) {
      // window.alert sends the error using the browsers built in error alert function?
      catchErrors(error, window.alert)
    } finally {
      setLoading(false);
    }
  }

  return (
    <Input
      type="number"
      min="1"
      placeholder="Quantity"
      value={quantity}
      onChange={event => setQuantity(Number(event.target.value))}
      action={
        user && success
          ? {
              color: "blue",
              content: "Item Added!",
              icon: "plus cart",
              disabled: true
            }
          : user
          ? {
              color: "orange",
              content: "Add to Cart",
              icon: "plus cart",
              loading,
              disabled: loading,
              onClick: handleAddProductToCart
            }
          : {
              color: "blue",
              content: "Sign Up To Purchase",
              icon: "signup",
              onClick: () => router.push("/signup")
            }
      }
    />
  );
}

export default AddProductToCart