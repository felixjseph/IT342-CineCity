import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_DATA_URL}/auth/check`, {
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

    return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;