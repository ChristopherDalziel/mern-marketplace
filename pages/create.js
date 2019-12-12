import {Form, Input, TextArea, Button, Image, Message, Header, Icon} from 'semantic-ui-react';
import React from 'react';

const INITIAL_PRODUCT = {
  // These fields must match the forms below exactly
  name: '',
  price: '',
  media: '',
  description: '',
  inventoryQuantity: ''
}

// Create of CRUD
function CreateProudct() {
  // React hook always goes first?
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  // Creating the media/image preview below the image upload once you've added it
  const [mediaPreview, setMediaPreview] = React.useState('')
  // Creating the success message that is activated inside the form upon a succesful submission. Set false.
  const [success, setSuccess] = React.useState(false);

  // onChange/handleChange Function
  function handleChange(event) {
    const {name, value, files} = event.target
    // For Media/Image
    if(name === 'media') {
      setProduct((prevState) => ({...prevState, media: files[0]}));
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
    // Everything else other than images or media - Inside the square brackets is a "computed property"
    setProduct(prevState => ({...prevState, [name]: value}));
    // Prints the changes to the console
    // console.log(product);
  }};

  // Create the submission rules
  function handleSubmit(event){
    // Prevent the default of the page refreshing upon clicking the submit button 
    event.preventDefault();
    console.log(product)
    // Resetting our form back to default(empty) on submit
    setProduct(INITIAL_PRODUCT);
    // Upon succesful submission change success to true
    setSuccess(true);
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form success={success} onSubmit={handleSubmit}>
        <Message 
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
          />
          <Form.Group>
            <Form.Field 
              control={Input}
              name="name"
              label="Name"
              placeholder="Name"
              value={product.name}
              onChange={handleChange}
              />
              <Form.Field
              control={Input}
              name="price"
              label="Price"
              placeholder="Price"
              minimum="0.00"
              step="1.00"
              type="number"
              value={product.price}
              onChange={handleChange}
              />
              <Form.Field
              control={Input}
              name="qty"
              label="Inventory Quantity"
              placeholder="Inventory Quantity"
              minimum="1"
              step="1"
              type="number"
              onChange={handleChange}
              />
              </Form.Group>
              <Form.Field
              control={Input}
              name="media"
              type="file"
              label="Image"
              accept="image/*"
              content="Select Image"
              onChange={handleChange}
              />
              <Image src={mediaPreview} rounded centered size="small" />
              <Form.Field
                control={TextArea}
                name="description"
                label="Description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
              />
              <Form.Field
                control={Button}
                color="blue"
                icon="pencil alternate"
                content="Submit"
                type="submit"
              />
      </Form>
    </>
  )
}

export default CreateProudct;