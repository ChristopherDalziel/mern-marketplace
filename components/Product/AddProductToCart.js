import {Input} from 'semantic-ui-react';

function AddProductToCart({inventoryQuantity}) {
  return <Input
          type="number"
          min="1"
          value="1"
          placeholder="Quantity"
          action={{
            color: 'orange',
            content: "Add to cart",
            icon: 'plus cart'
          }}
        />
}

export default AddProductToCart