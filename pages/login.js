import React from 'react';
import {Button, Form, Icon, Message, Segment} from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

// Creating the base user
const INITAL_USER = {
  email:"", 
  password: ""
}

function Signup() {
  // State variable
  const [user, setUser] = React.useState(INITAL_USER)
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  // Converting the INITAL_USER object to an Array taking it's values so we can interate over them and find out if they're "truthy"
  React.useEffect(() => {
    // If every element exists, we want to say we DO have a user..
    const isUser = Object.values(user).every(el => Boolean(el))
    // If we don't have a user we want to disable our form
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  // This function updates the INITAL_USER const
  function handleChange(event){
    const {name, value} = event.target
    setUser(prevState => ({...prevState, [name]: value}))
  }

  async function handleSubmit() {
    event.preventDefault()
    try {
      setLoading(true)
      setError('');
      console.log(user)
      // Make request to sign up user
    } catch(error){
      catchErrors(error, setError);
    } finally {
      setLoading(false);

    }
  }

  return <>
  <Message
    attached
    icon="privacy"
    header="Welcome Back!"
    content="Log in with email and password"
    color="blue"
    />
  <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
    <Message 
      error
      header="Oops!"
      content={error}
    />
    <Segment>
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        label="Email"
        placeholder="Email"
        name="email"
        type="email"
        value={user.email}
        onChange={handleChange}
      />
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        label="Password"
        placeholder="Password"
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
      />
      <Button
        disabled={disabled || loading}
        icon="sign in"
        type="submit"
        color="orange"
        content="Login!"
      />
    </Segment>
  </Form>
  <Message attached="bottom" warning>
    <Icon name="help"/>
    New user?{" "}
    <Link href="/signup">
      <a>Sign up here</a>
    </Link>{" "}instead.
  </Message>
  </>;
}

export default Signup;