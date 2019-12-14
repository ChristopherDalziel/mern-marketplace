import cookie from 'js-cookie';
import Router from 'next/router';

// Creating our cookie

export function handleLogin(token) {
  // (name, value)
  cookie.set('token', token)
  Router.push('/account')
}