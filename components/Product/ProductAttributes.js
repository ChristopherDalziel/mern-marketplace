import React from 'react';
import { Header, Button, Modal } from "semantic-ui-react";
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

function ProductAttributes({description, _id}){
  // React.useState is hiding our delete product by setting it to false until we 'onClick' in the return value
  const [modal, setModal] = React.useState(false)

  // Delete function
  async function handleDelete(params) {
    const url = `${baseUrl}/api/product`
    const payload = {params: {_id}}
    await axios.delete(url, payload)
    
  }

  return <>
    <Header as="h3">About this product</Header>
      <p>{description}'testing'</p>
      <Button icon="trash alternate outline"
      color="red"
      content="Delete Product"
      onClick={() => setModal(true)}
    />
    <Modal open={modal} dimmer="blurring">
      <Modal.Header>Confirm Delete</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this product?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button 
          onClick={() => setModal(false)}
          content="Cancel"/>
        <Button
          negative
          icon="trash"
          labelPosition="right"
          content="Delete"
          onClick={handleDelete}
          />
      </Modal.Actions>
    </Modal>

  </>
}

export default ProductAttributes;