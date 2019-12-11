import {Card} from 'semantic-ui-react';

function ProductList({products}) {
  function mapProductsToItems(products) {
    return products.map(product => ({
      header: product.name,
      meta: `$${product.price}`,
      color: 'red',
      image: product.imageUrl,
      fluid: true, //takes all possible space
      childKey: product._id,
      href: `product?_id=${product._id}` //creates the link to the product when clicked
    }));
  }
  return <Card.Group itemsPerRow="3" centered stackable items={mapProductsToItems(products)} />;
}

export default ProductList;