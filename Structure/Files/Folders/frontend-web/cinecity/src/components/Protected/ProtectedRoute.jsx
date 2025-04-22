import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/check', {
                    credentials: 'include',
                });
                const result = await response.json();
                console.log('Auth check response:', result);
                setIsAuthenticated(result);
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
            }

        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/newlogin" />;
};

export default ProtectedRoute;