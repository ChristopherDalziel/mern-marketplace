import React from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';

//  Checking our account permissions client side when we hit out account page
function AccountPermissions() {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    getUsers()

  }, [])

  async function getUsers(){
    const url = `${baseUrl}/api/users`
    const token = cookie.get('token')
    const payload = {headers: {Authorization: token}}
    const response = await axios.get(payload, url)
    console.log(response.data)

  }

  return <>AccountPermissions </>;
}

export default AccountPermissions;


// WHERE I'M CURRENTLY WORKING