import React, {useEffect} from 'react'
import { logOut } from "../services/AuthService"

const LogOut = () => {
 useEffect(() => {
    logOut();

    // for full reloading of the page
    window.location.assign("/");
     }, []);
  return (
    null
  )
}

export default LogOut