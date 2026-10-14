import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    // null means we are still checking the user's permission
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        // Get the JWT saved during login
        const token = localStorage.getItem('token');

        if (!token) {
            setIsAdmin(false);
            return;
        }

        // Ask the backend to verify the user's admin role
        axios.get('http://localhost:5000/api/auth/verify-admin', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                // Backend confirmed the user is an admin
                setIsAdmin(true);
            })
            .catch(() => {
                // Verification failed or access was denied
                setIsAdmin(false);
            });
    }, []);

    // Wait for the backend response
    if (isAdmin === null) {
        return <p>Checking permissions...</p>;
    }

    // Block users without admin permission
    if (!isAdmin) {
        return <Navigate to="/welcome" replace />;
    }

    // Show the protected page
    return children;
};

export default ProtectedRoute;