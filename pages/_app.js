import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Router from "next/router";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Making sure unauthenticated users/users who do not have a token cannot access the /account or /create routes.
    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;
        // confirming the accessing users role so we can further authenticate their paths throughout the website
        const isRoot = user.role === 'root';
        const isAdmin = user.role === 'admin';
        // If authenticated but not of role admin or root, redirect from the create page.
        // We can do this in a shorter syntax by just confirming they're a user, however this is more explicit.
        const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname === '/create';
        if(isNotPermitted){
          // If user is not permitted redirect them to the homepage
          redirectUser(ctx, '/')
        }
        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);
        // What if the token/cookie gets corrupted? Data is changed without the user doing so, or something? We need to destroy the cookie immediately and redirect them off the current page incase something malicious is trying to get into their account info.
        // 1. Throw out invalid token
        destroyCookie(ctx, "token");
        // 2. Redirect to login page
        redirectUser(ctx, "/login");
      }
    }
    return { pageProps };
  }

  // Log the user out of all windows when they logout not just the current window, via local storage, rest of the code is in auth.
  componentDidMount(){
    window.addEventListener('storage', this.syncLogout)
  };

  syncLogout = event => {
    if(event.key === 'logout'){
      console.log('Logged out from storage')
      Router.push('/login')
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
