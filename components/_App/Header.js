// Importing Semantic UI
import { Menu, Container, Icon, Image } from 'semantic-ui-react';
// Importing NextJS
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';

// Creating the rules for our load/progress bar
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({user}) {
  console.log(user);
  const router = useRouter();
  // const user = false; < This was a hard-coded user variable for our headers

  // Creating Active Route data, so you can see within the URL where you're located once we've created an active app.
  function isActive(route){
    return route === router.pathname;
  }

  // Our Semantic UI Menu/Header
  return (
  <Menu fluid id="menu" inverted stackable>
    <Container text>
      <Link href="/">
        <Menu.Item header active={isActive('/')}>
          <Image
            size="mini"
            src="/static/logo.svg"
            style={{marginRight: '1em'}} />
            Mineral Exchange 3.0
        </Menu.Item>
      </Link>

      <Link href="/cart">
        <Menu.Item header active={isActive('/cart')}>
          <Icon
            name="cart"
            size="large" />
            Cart
        </Menu.Item>
      </Link>

      {/* If user is true */}
      {user && 
      <Link href="/create">
        <Menu.Item header active={isActive('/create')}>
          <Icon
            name="add square"
            size="large" />
            Create
        </Menu.Item>
      </Link>}

      {/* If User is true */}
      {user ? (<>
      <Link href="/account">
        <Menu.Item header active={isActive('/account')}>
          <Icon
            name="user"
            size="large" />
            Account
        </Menu.Item>
      </Link>

      <Menu.Item header>
        <Icon
          name="sign out"
          size="large" />
          Logout
      </Menu.Item>
      </>)
      :
      (<>
      <Link href="/login">
        <Menu.Item header active={isActive('/login')}>
          <Icon
            name="sign in"
            size="large" />
            Login
        </Menu.Item>
      </Link>

      <Link href="/signup">
        <Menu.Item header active={isActive('/signup')}>
          <Icon
            name="signup"
            size="large" />
            Signup
        </Menu.Item>
      </Link>
      </>)}

    </Container>
  </Menu>
  )
}

export default Header;