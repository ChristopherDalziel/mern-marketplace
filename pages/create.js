import {Form, Input, TextArea, Button, Image, Message, Header, Icon} from 'semantic-ui-react';
import React from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors'

const INITIAL_PRODUCT = {
  // These fields must match the forms below exactly
  name: '',
  price: '',
  image: '',
  description: '',
  inventoryQuantity: ''
};

// Create of CRUD
function CreateProudct() {
  // React hook always goes first?
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  // Creating the Image preview below the image upload once you've added it
  const [imagePreview, setImagePreview] = React.useState('')
  // Creating the success message that is activated inside the form upon a succesful submission. Set false.
  const [success, setSuccess] = React.useState(false);
  // Creating the loading spinner upon submission
  const [loading, setLoading] = React.useState(false);
  // Error handling un-entered fields to display outside of the console
  const [disabled, setupDisabled] = React.useState(true);
  const [error, setError] = React.useState("")
  
  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean (el))
    isProduct? setupDisabled(false) : setupDisabled(true)
  }, [product])

  // onChange/handleChange Function
  function handleChange(event) {
    const {name, value, files} = event.target
    // For Image
    if(name === 'image') {
      setProduct((prevState) => ({...prevState, image: files[0]}));
      setImagePreview(window.URL.createObjectURL(files[0]))
    } else {
    // Everything else other than image - Inside the square brackets is a "computed property"
    setProduct(prevState => ({...prevState, [name]: value}));
    // Prints the changes to the console
    // console.log(product);
  }};

  // Image hosting function
  async function handleImageUpload() {
    const data = new FormData();
    data.append('file', product.image)
    data.append('upload_preset', 'mineral-exchange3')
    data.append('cloud_name', 'acloudname10')
    const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const imageUrl = response.data.url
    return imageUrl;
  }

  // Create the submission rules
  async function handleSubmit(event){
    try {
      // Prevent the default of the page refreshing upon clicking the submit button 
      event.preventDefault();
      setError('')
      setLoading(true)
      const imageUrl = await handleImageUpload()
      const url = `${baseUrl}/api/product`
      // ...spreads in all of the product data, instead we could write product = {name, price, description} and destructure that way.
      const payload = {...product, imageUrl}
      // Do not NEED to below, is been used for testing:
      // const {name, price, description} = product
      // const payload = { name: "", price, description, imageUrl}
      await axios.post(url, payload);
      // Resetting our form back to default(empty) on submit
      setProduct(INITIAL_PRODUCT);
      // Upon succesful submission change success to true
      setSuccess(true);
    } catch(error){
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
    
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
        <Message
          error
          header="Oops!"
          content={error}
        />
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
              name="inventoryQuantity"
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
              name="image"
              type="file"
              label="Image"
              accept="image/*"
              content="Select Image"
              onChange={handleChange}
              />
              <Image src={imagePreview} rounded centered size="small" />
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
                disabled={disabled || loading}
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