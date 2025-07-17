import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/AdminPanel.css';
import { logout } from '../../utils/auth';
import logo from '../../assets/img/logo.svg';

function AdminNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const menuRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (!mobileOpen) return;

        function onKeyDown(e) {
            if (e.key === 'Escape') setMobileOpen(false);
            if (e.key === 'Tab') {
                const focusable = menuRef.current.querySelectorAll(
                    'a, button, [tabindex]:not([tabindex="-1"])'
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
        logout(); // using the centralized logout
        navigate('/admin-login');
    };

    const links = [
        { to: '/admin', label: 'Dashboard' }, // corrected route
        { to: '/admin/settings', label: 'Settings' },
    ];

    return (
        <nav className="admin-navbar" aria-label="Admin main navigation">
            <div className="admin-navbar-container">
                <NavLink to="/admin" className="admin-logo-link">
                    <img src={logo} alt="Fatayer Time Logo" className="admin-logo-img" />
                    <span className="admin-logo-text">Admin</span>
                </NavLink>

                <ul className="admin-links" role="menubar">
                    {links.map(link => (
                        <li key={link.to} role="none">
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `admin-link ${isActive ? 'active-link' : ''}`
                                }
                                role="menuitem"
                                tabIndex={0}
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={handleLogout}
                            className="admin-logout-btn"
                            aria-label="Log out"
                        >
                            Log out
                        </button>
                    </li>
                </ul>

                <button
                    className="admin-mobile-toggle"
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen(prev => !prev)}
                >
                    <span className="admin-hamburger-icon">☰</span>
                </button>
            </div>

            {mobileOpen && (
                <div className="admin-mobile-menu-backdrop" aria-modal="true" role="dialog">
                    <div className="admin-mobile-menu" ref={menuRef}>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="admin-mobile-close"
                            aria-label="Close navigation menu"
                        >
                            ×
                        </button>
                        <ul className="admin-mobile-links" role="menubar">
                            {links.map(link => (
                                <li key={link.to} role="none">
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) =>
                                            `admin-mobile-link ${isActive ? 'active-link' : ''}`
                                        }
                                        role="menuitem"
                                        tabIndex={0}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => {
                                        setMobileOpen(false);
                                        handleLogout();
                                    }}
                                    className="admin-logout-btn"
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
