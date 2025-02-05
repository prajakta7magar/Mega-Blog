import React from 'react'
import {useDispatch} from 'react-redux'
import authservice from '../../Appwrite/auth_service'
import { logout } from '../../store/authslice'

function LogoutBtn() {
    const dispatch=useDispatch()

    const LogoutHandler=()=>
    {
      authservice.logout().then(()=>
      {
         dispatch(logout())
      }) //logout function return promisse so we use .then
    }
  return (
    <button  
    onClick={LogoutHandler}
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-300 rounded-full'>
      logout
    </button>
  )
}

export default LogoutBtn
