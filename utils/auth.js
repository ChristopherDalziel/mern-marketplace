import cookie from "js-cookie";
import Router from "next/router";

export function handleLogin(token) {
  cookie.set("token", token);
  Router.push("/account");
}

export function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

export function handleLogout(){
  cookie.remove('token');
  // When we logout we're going send a notice to local storage so we log out in all windows, not just the current one, further code in _app
  window.localStorage.setItem('logout', Date.now());
  Router.push('/login');
}