import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePatient } from '../context/PatientContext';

const PrivateRoute = ({ children }) => {
    const { user } = usePatient();

    if (!user) {
        console.warn("Unauthorized access attempt. Redirecting to /login.");
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default PrivateRoute;
