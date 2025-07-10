import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.css';

const AdminNavbar = ({ logo = '🍽️ Fatayer Admin' }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/admin-login');
    };

    return (
        <nav className={styles.navbar} aria-label="Admin navigation">
            <div className={styles.container}>
                <button
                    className={styles.logo}
                    onClick={() => navigate('/admin')}
                    aria-label="Go to dashboard"
                >
                    {logo}
                </button>

                <div className={styles.links}>
                    <button
                        onClick={() => navigate('/admin-settings')}
                        aria-label="Manage account"
                    >
                        ⚙️ Manage Account
                    </button>
                    <button
                        onClick={handleLogout}
                        aria-label="Logout"
                        className={styles.logout}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

AdminNavbar.propTypes = {
    logo: PropTypes.string,
};

export default AdminNavbar;