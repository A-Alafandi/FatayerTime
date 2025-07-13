import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

function SimpleHeader({ showHero = true, showButtons = true }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <>
        {/* Header */}
        <header
            id="simple-header"
            className="header d-flex align-items-center fixed-top"
            style={{ backgroundColor: showHero ? 'transparent' : '#fff' }}
        >
          <div className="simple-header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
            <Link
                to="/"
                className="logo d-flex align-items-center me-auto me-xl-0"
                aria-label="Fatayer Time Home"
            >
              <img src={logo} alt="Fatayer Time Logo" />
              <h1
                  className="sitename"
                  style={{ color: showHero ? 'black' : '#222' }}
              >
                Fatayer <span style={{ color: 'green' }}>Time</span>
              </h1>
            </Link>
            <nav
                id="navmenu"
                className="navmenu"
                role="navigation"
                aria-label="Main navigation"
                style={{ display: isMobile && !isMobileMenuOpen ? 'none' : 'block' }}
            >
              <ul>
                <li>
                  <Link
                      to="/"
                      className={location.pathname === '/' ? 'active' : ''}
                      aria-current={location.pathname === '/' ? 'page' : undefined}
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
            {isMobile && (
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.5rem',
                      color: showHero ? 'black' : '#222',
                      cursor: 'pointer',
                    }}
                    aria-label="Toggle mobile menu"
                >
                  ☰
                </button>
            )}
          </div>
        </header>

        {/* Hero Section */}
        {showHero && (
            <section id="menupage" className="simple-hero-section">
              <div className="simple-hero-overlay"></div>
              <div className="container-fluid p-0 text-center text-white simple-hero-content">
                <h2 className="simple-hero-title mt-5">
                  Enjoy Our Fresh Made Fatayer
                </h2>
              </div>
            </section>
        )}

        {/* Mobile Menu */}
        {isMobile && isMobileMenuOpen && (
            <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  zIndex: 999,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '2rem',
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                  transition: 'transform 0.3s ease',
                }}
            >
              <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    background: 'none',
                    border: 'none',
                    fontSize: '2rem',
                    cursor: 'pointer',
                  }}
                  aria-label="Close mobile menu"
              >
                ×
              </button>
              <Link
                  to="/"
                  style={{
                    textDecoration: 'none',
                    color: '#222',
                    fontSize: '1.5rem',
                    fontWeight: '500',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                Home
              </Link>
            </div>
        )}
      </>
  );
}

export default SimpleHeader;