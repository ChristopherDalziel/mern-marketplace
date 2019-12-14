import { Header, Segment, Button, Icon } from "semantic-ui-react";

function CartItemList() {
  // Setting user signed in to false by default
  const user = false;

  return (
    <Segment secondary color="black" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket" />
        No products in your cart. Add some!
      </Header>
      <div>
        {/* If user signed in show view products */}
        {user ? (
          <Button color="orange">View Products</Button>
        ) : (
          // If user is not signed in ask them to do so
          <Button color="blue">Login to Add Products</Button>
        )}
      </div>
    </Segment>
  );
}

export default CartItemList;
