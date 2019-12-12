import {Form, Input, TextArea, Button, Image, Message, Header, Icon} from 'semantic-ui-react';

function CreateProudct() {
  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              name="name"
              label="Name"
              placeholder="Name"
              />
              <Form.Field
              control={Input}
              name="price"
              label="Price"
              placeholder="Name"
              minimum="0.00"
              step="1.00"
              type="number"
              />
              <Form.Field
              control={Input}
              name="media"
              type="file"
              label="Media"
              accept="image/*"
              content="Select Image"
              />
              <Form.Field
                control={TextArea}
                name="description"
                label="Description"
                placeholder="Description"
              />
              <Form.Field
                control={Button}
                color="blue"
                icon="pencil alternate"
                content="Submit"
                type="submit"
              />
          </Form.Group>
      </Form>
    </>
  )
}

export default CreateProudct;