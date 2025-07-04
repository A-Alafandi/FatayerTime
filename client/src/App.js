import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MenuPage from './components/MenuPage';
import SimpleHeader from './components/SimpleHeader';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import HomePage from './components/HomePage';

import { clearTokens, isTokenValid, storeAccessToken } from "./utils/auth";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid());
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/auth/refresh', {
                    method: 'POST',
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    storeAccessToken(data.token);
                    setIsAuthenticated(true);
                } else {
                    console.warn('Refresh failed');
                    clearTokens();
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Refresh error:', error);
                setIsAuthenticated(false);
            }
        };

        refreshAccessToken();
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        navigate('/admin');
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <Routes>
            {/* Public pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={
                <>
                    <SimpleHeader />
                    <MenuPage />
                </>
            }/>

            {/* Admin pages */}
            <Route path="/admin" element={
                isLoggedIn
                    ? <AdminDashboard onLogout={handleLogout} />
                    : <Navigate to="/admin-login" />
            }/>

            <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />
        </Routes>
    );
}