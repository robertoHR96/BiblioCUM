import React from 'react'
import { Navigate } from 'react-router-dom';

export const BasicRouter = ({ children }) => {
    return (
        (true)
            ? children
            : <Navigate to="/" />
    )
}
