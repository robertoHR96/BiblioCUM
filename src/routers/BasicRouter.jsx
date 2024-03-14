import React, { useState }  from 'react'
import { Navigate } from 'react-router-dom';
import { useUsuarioContext } from "../context/UsuarioContext.jsx";
import { Modal } from 'reactstrap';

export const BasicRouter = ({ children }) => {
  const { user, loginUser, logoutUser } = useUsuarioContext();
    
  return (
        (user.logeado === "login")
            ? children
            :   <Navigate to="/" />
    )
}
