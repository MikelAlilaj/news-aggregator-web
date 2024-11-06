import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/AuthService'; 

const AuthMiddleware = ({ children }) => {

    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;  
};

export default AuthMiddleware;
