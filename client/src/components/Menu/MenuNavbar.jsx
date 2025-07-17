// MenuNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../Main.css';

export default function MenuNavbar() {
    return (
        <nav className="menu-navbar">
            <div className="menu-navbar-container">
                <Link to="/" className="menu-navbar-brand">Fatayer Time</Link>
                <Link to="/" className="menu-navbar-link">Home</Link>
            </div>
        </nav>
    );
}
