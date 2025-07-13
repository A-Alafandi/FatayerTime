import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './AdminNavbar.css';
import { contactInfo } from '../contactInfo'

const AdminNavbar = ({ logo = `${contactInfo.name} Admin` }) => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/admin-login');
    };

    return (
        <nav className={styles.adminNavbar} aria-label="Admin navigation">
            <div className={styles.navbarContainer}>
                <button
                    className={styles.navbarLogo}
                    onClick={() => navigate('/admin')}
                    aria-label="Go to admin dashboard"
                >
                    <i className="bi bi-shop me-2"></i>
                    {logo}
                </button>

                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
                </button>

                <div className={`${styles.navbarLinks} ${isMobileMenuOpen ? styles.navbarLinksOpen : ''}`}>
                    <button
                        className={styles.navbarBtn}
                        onClick={() => navigate('/admin-settings')}
                        aria-label="Manage account"
                    >
                        <i className="bi bi-gear-fill me-2"></i>
                        Manage Account
                    </button>
                    <button
                        className={`${styles.navbarBtn} ${styles.logout}`}
                        onClick={handleLogout}
                        aria-label="Logout"
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
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