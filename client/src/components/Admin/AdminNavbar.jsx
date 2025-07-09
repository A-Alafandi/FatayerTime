import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

export default function AdminNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/admin-login');
    };

    return (
        <nav className="admin-navbar">
            <div className="navbar-container">
                <div className="navbar-logo" onClick={() => navigate('/admin')}>
                    🍽️ Fatayer Admin
                </div>
                <div className="navbar-links">
                    <button className="navbar-btn" onClick={() => navigate('/admin-settings')}>
                        ⚙️ Manage Account
                    </button>
                    <button className="navbar-btn logout" onClick={handleLogout}>
                        🚪 Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
