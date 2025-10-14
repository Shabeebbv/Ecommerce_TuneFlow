import React from 'react'
import { Navigate } from 'react-router-dom'

export const Protuctadmin = ({children}) => {

    const user=JSON.parse(localStorage.getItem('loggedinuser'))
    if(!user||user.role!=="admin"){
        return <Navigate to='/login' replace/>

    }
  return children
}
