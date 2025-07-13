import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isTokenValid } from './utils/auth';
import Spinner from './components/spinner/Spinner';

// Lazy-loaded components
const HomePage = lazy(() => import('./components/Customer/HomePage'));
const MenuPage = lazy(() => import('./components/Menu/MenuPage'));
const AdminLogin = lazy(() => import('./components/Login/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));
const AdminSettings = lazy(() => import('./components/Admin/AdminSettings'));
const NotFound = lazy(() => import('./components/NotFound'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught an error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#2c3e50' }}>
                    <h1>Something went wrong.</h1>
                    <p>Please try refreshing the page or contact support.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

// Protected Route Component
function ProtectedRoute({ children }) {
    return isTokenValid() ? children : <Navigate to="/admin-login" replace />;
}

export default function App() {
    return (
        <ErrorBoundary>
            <Suspense
                fallback={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <Spinner size="large" />
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route
                        path="/adminMenu"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/settings"
                        element={
                            <ProtectedRoute>
                                <AdminSettings />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
}