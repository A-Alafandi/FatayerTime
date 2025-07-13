import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AdminNavbar.module.css'; // <-- Use CSS module
import logo from '../../assets/logo.png'; // Adjust path as needed

function AdminNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const menuRef = useRef();
    const navigate = useNavigate();

    // Trap focus in mobile nav and close on Escape/click outside
    useEffect(() => {
        if (!mobileOpen) return;

        function onKeyDown(e) {
            if (e.key === 'Escape') setMobileOpen(false);
            // Trap focus
            if (e.key === 'Tab') {
                const focusable = menuRef.current.querySelectorAll(
                    'a,button,[tabindex]:not([tabindex="-1"])'
                );
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (!focusable.length) return;
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
        function onClick(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMobileOpen(false);
            }
        }
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('mousedown', onClick);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mousedown', onClick);
        };
    }, [mobileOpen]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        // Optional: clear HttpOnly cookies here if used
        navigate('/admin/login');
        // Optionally: trigger notification to say "Logged out"
    };

    // Example links for your admin dashboard
    const links = [
        { to: '/admin/dashboard', label: 'Dashboard' },
        { to: '/admin/settings', label: 'Settings' },
    ];

    return (
        <nav className={styles.navbar} aria-label="Admin main navigation">
            <div className={styles.navbarContainer}>
                <Link to="/admin/dashboard" className={styles.logoLink}>
                    <img src={logo} alt="Fatayer Time Logo" className={styles.logoImg} />
                    <span className={styles.logoText}>Admin</span>
                </Link>

                {/* Desktop menu */}
                <ul className={styles.links} role="menubar">
                    {links.map(link => (
                        <li key={link.to} role="none">
                            <Link
                                to={link.to}
                                className={styles.link}
                                role="menuitem"
                                tabIndex={0}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={handleLogout}
                            className={styles.logoutButton}
                            aria-label="Log out"
                        >
                            Log out
                        </button>
                    </li>
                </ul>

                {/* Hamburger (mobile) */}
                <button
                    className={styles.mobileToggle}
                    aria-label="Open navigation menu"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen(true)}
                >
                    <span className={styles.hamburgerIcon}>☰</span>
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className={styles.mobileMenuBackdrop} aria-modal="true" role="dialog">
                    <div className={styles.mobileMenu} ref={menuRef}>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className={styles.mobileClose}
                            aria-label="Close navigation menu"
                        >
                            ×
                        </button>
                        <ul className={styles.mobileLinks} role="menubar">
                            {links.map(link => (
                                <li key={link.to} role="none">
                                    <Link
                                        to={link.to}
                                        className={styles.mobileLink}
                                        role="menuitem"
                                        tabIndex={0}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => {
                                        setMobileOpen(false);
                                        handleLogout();
                                    }}
                                    className={styles.logoutButton}
                                    aria-label="Log out"
                                >
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default AdminNavbar;
