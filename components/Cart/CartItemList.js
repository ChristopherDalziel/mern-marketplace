import {Header, Segment, Button, Icon, Item, Message} from "semantic-ui-react";
import {useRouter} from 'next/router';

function CartItemList({products, user, handleRemoveFromCart, success}){
  const router = useRouter()

  // How we are displaying our cart items to the user
  function mapCartToProductsToItems(products){
    return products.map(p => ({
      childKey: p.product._id, 
      header: (
        <Item.Header as="a" onClick={() => router.push(`/product?product?_id=${p.product._id}`)}>
           {p.product.name}
        </Item.Header>
      ),
      image: p.product.imageUrl, 
      meta: `${p.quantity} x $${p.product.price}`,
      fluid: true,
      extra:  (
        <Button
          basic
          icon='remove'
          floated="right"
          onClick={() => handleRemoveFromCart(p.product._id)}
        />
      )
    }));
  }

  // Display upon a successful payment
  if(success){
    return(
      <Message 
        success
        header="Success!"
        content="Your order and payment has been accepted"
        icon="star outline" />
    )
  }

  // What we are showing if there are no products in the cart array
  if(products.length === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No products in your cart. Add some!
        </Header>
        <div>
          {/* If user signed in show view products */}
          {user ? (
            <Button color="orange" onClick={() => router.push('/')}>View Products</Button>
          ) : (
            // If user is not signed in ask them to do so
            <Button color="blue" onClick={() => router.push('/login')}>Login to Add Products</Button>
          )}
        </div>
      </Segment>
    );
  } 

  // The grouped display in the middle of the page
  return (
    // Divided adds a line below each item
    <Item.Group divided items={mapCartToProductsToItems(products)} />
  )

}

export default CartItemList;