import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Customer/HomePage';
import MenuPage from './components/Menu/MenuPage';
import AdminLogin from './components/Login/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import { isTokenValid } from './utils/auth';
import AdminSettings from './components/Admin/AdminSettings';
import NotFound from './components/NotFound';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="*" element={<NotFound />} />
            <Route
                path="/admin"
                element={
                    isTokenValid() ? (
                        <AdminDashboard />
                    ) : (
                        <Navigate to="/admin-login" replace />
                    )
                }
            />
        </Routes>
    );
}
