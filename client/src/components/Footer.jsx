import React from 'react';
import logo from '../assets/logo.svg';
import { contactInfo } from './contactInfo';

function ModernFooter() {
    const footerStyle = {
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: '#fff',
        padding: '3rem 0 1rem',
        position: 'relative',
        overflow: 'hidden',
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
    };

    const footerContentStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '2rem',
    };

    const logoSectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    };

    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#fff',
        textDecoration: 'none',
    };

    const descriptionStyle = {
        color: '#bdc3c7',
        lineHeight: '1.6',
        fontSize: '0.95rem',
    };

    const sectionTitleStyle = {
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#fff',
    };

    const linkListStyle = {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    };

    const linkStyle = {
        color: '#bdc3c7',
        textDecoration: 'none',
        fontSize: '0.95rem',
        transition: 'color 0.3s ease',
    };

    const bottomBarStyle = {
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '1rem',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#bdc3c7',
        marginTop: '2rem',
    };

    return (
        <footer style={footerStyle}>
            {/* Background Pattern */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.5,
            }} />

            <div style={containerStyle}>
                <div style={footerContentStyle}>
                    {/* Logo & Description */}
                    <div style={logoSectionStyle}>
                        <a href="/" style={logoStyle} aria-label="Fatayer Time Home">
                            <img
                                src={logo}
                                alt="Fatayer Time Logo"
                                style={{ height: '40px' }}
                            />
                            <span>Fatayer <span style={{ color: '#ff6b35' }}>Time</span></span>
                        </a>
                        <p style={descriptionStyle}>
                            Discover the authentic taste of Middle Eastern cuisine at Fatayer Time. Fresh, flavorful, and made with love.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 style={sectionTitleStyle}>Quick Links</h3>
                        <ul style={linkListStyle}>
                            <li>
                                <a href="/menu" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#ff6b35'} onMouseLeave={(e) => e.target.style.color = '#bdc3c7'} role="menuitem">
                                    Menu
                                </a>
                            </li>
                            <li>
                                <a href="#about" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#ff6b35'} onMouseLeave={(e) => e.target.style.color = '#bdc3c7'} role="menuitem">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#services" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#ff6b35'} onMouseLeave={(e) => e.target.style.color = '#bdc3c7'} role="menuitem">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#contact-section" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#ff6b35'} onMouseLeave={(e) => e.target.style.color = '#bdc3c7'} role="menuitem">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 style={sectionTitleStyle}>Contact Us</h3>
                        <ul style={linkListStyle}>
                            <li>
                                <a href={`tel:${contactInfo.phone}`} style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#ff6b35'} onMouseLeave={(e) => e.target.style.color = '#bdc3c7'} aria-label="Call us">
                                    {contactInfo.phone}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${contactInfo.email}`} style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#ff6b35'} onMouseLeave={(e) => e.target.style.color = '#bdc3c7'} aria-label="Email us">
                                    {contactInfo.email}
                                </a>
                            </li>
                            <li>
                                <a href={`https://wa.me/${contactInfo.whatsapp.replace('+', '')}`} style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#ff6b35'} onMouseLeave={(e) => e.target.style.color = '#bdc3c7'} aria-label="WhatsApp us" target="_blank" rel="noopener noreferrer">
                                    WhatsApp
                                </a>
                            </li>
                            <li>
                                <span style={descriptionStyle}>{contactInfo.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={bottomBarStyle}>
                    &copy; {new Date().getFullYear()} Fatayer Time. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

export default ModernFooter;