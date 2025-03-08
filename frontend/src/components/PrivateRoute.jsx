import { Fragment } from "react";
import { Navigate } from "react-router-dom";




export default function PrivateRoute({children}){
    const isAuth = sessionStorage.getItem('auth') === 'true'
    console.log(isAuth)

    console.log(isAuth)
    return isAuth ? children : <Navigate to="/" />
}