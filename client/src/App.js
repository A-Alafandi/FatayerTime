import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isTokenValid } from './utils/auth';
import Spinner from './components/spinner/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Main.css'; // Your custom styles (if any)


// Lazy-loaded components
const HomePage = lazy(() => import('./components/HomePage'));
const MenuPage = lazy(() => import('./components/Menu/MenuPage'));
const AdminLogin = lazy(() => import('./components/Login/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));
const AdminSettings = lazy(() => import('./components/Admin/AdminSettings'));
const NotFound = lazy(() => import('./components/NotFound'));

// Error Boundary (as functional component for clarity)
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, info: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught an error:', error, info);
        this.setState({ info });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#2c3e50' }}>
                    <h1>Something went wrong.</h1>
                    <p>Please try refreshing the page or contact support.</p>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <pre style={{ color: 'crimson', marginTop: '1rem', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
              {this.state.error.toString()}
                            {this.state.info ? "\n" + JSON.stringify(this.state.info) : ""}
            </pre>
                    )}
                </div>
            );
        }
        return this.props.children;
    }
}

// Protected Route as a component
function ProtectedRoute({ children }) {
    return isTokenValid() ? children : <Navigate to="/admin-login" replace />;
}

export default function App() {
    return (
        <ErrorBoundary>
            <Suspense
                fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'
                    }}>
                        <Spinner size="large" />
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route
                        path="/admin"
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
