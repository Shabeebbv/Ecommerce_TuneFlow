import React from 'react'
import { Navigate } from 'react-router-dom'
export const Loginroute = ({children}) => {
        const user=JSON.parse(localStorage.getItem( 'loggedinuser'))
        if(user){
            if(user.role==="user")
            return <Navigate to='/' replace/>
        
        if(user.role==="admin")
            return <Navigate to='/admin' replace/>
        
    }

        return children
    }


