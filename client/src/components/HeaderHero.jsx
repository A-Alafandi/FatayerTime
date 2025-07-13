import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

function ModernHeader({ showHero = true, showButtons = true }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: isScrolled || !showHero ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
    backdropFilter: isScrolled || !showHero ? 'blur(10px)' : 'none',
    borderBottom: isScrolled || !showHero ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'all 0.3s ease',
    padding: '1rem 0',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: isScrolled || !showHero ? '#2c3e50' : '#fff',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    transition: 'color 0.3s ease',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: isScrolled || !showHero ? '#2c3e50' : '#fff',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    padding: '0.5rem 1rem',
    borderRadius: '25px',
    position: 'relative',
  };

  const activeNavLinkStyle = {
    ...navLinkStyle,
    backgroundColor: '#ff6b35',
    color: '#fff',
  };

  const heroStyle = {
    background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  const heroContentStyle = {
    textAlign: 'center',
    color: '#fff',
    zIndex: 2,
    maxWidth: '800px',
    padding: '0 2rem',
  };

  const heroTitleStyle = {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const heroSubtitleStyle = {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
    marginBottom: '2rem',
    opacity: 0.9,
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '0 0.5rem',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#fff',
    color: '#ff6b35',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #fff',
  };

  const mobileMenuStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease',
  };

  return (
      <>
        {/* Modern Header */}
        <header style={headerStyle}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Link to="/" style={logoStyle} aria-label="Fatayer Time Home">
              <img
                  src={logo}
                  alt="Fatayer Time Logo"
                  style={{ height: '40px', marginRight: '0.5rem' }}
              />
              <span>Fatayer <span style={{ color: '#ff6b35' }}>Time</span></span>
            </Link>

            {/* Desktop Navigation */}
            <nav role="navigation" aria-label="Main navigation" style={{ display: isMobile ? 'none' : 'block' }}>
              <ul style={navStyle}>
                <li>
                  <Link
                      to="/"
                      style={location.pathname === '/' ? activeNavLinkStyle : navLinkStyle}
                      onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
                      role="menuitem"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                      to="/menu"
                      style={location.pathname === '/menu' ? activeNavLinkStyle : navLinkStyle}
                      onKeyDown={(e) => e.key === 'Enter' && navigate('/menu')}
                      role="menuitem"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <a href="#about" style={navLinkStyle} role="menuitem" onKeyDown={(e) => e.key === 'Enter' && document.querySelector('#about').scrollIntoView()}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" style={navLinkStyle} role="menuitem" onKeyDown={(e) => e.key === 'Enter' && document.querySelector('#services').scrollIntoView()}>
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact-section" style={navLinkStyle} role="menuitem" onKeyDown={(e) => e.key === 'Enter' && document.querySelector('#contact-section').scrollIntoView()}>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  display: isMobile ? 'block' : 'none',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: isScrolled || !showHero ? '#2c3e50' : '#fff',
                  cursor: 'pointer',
                }}
                aria-label="Toggle mobile menu"
            >
              ☰
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobile && (
            <div style={mobileMenuStyle}>
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
                  style={{ ...navLinkStyle, color: '#2c3e50', fontSize: '1.5rem' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate('/') && setIsMobileMenuOpen(false)}
                  role="menuitem"
              >
                Home
              </Link>
              <Link
                  to="/menu"
                  style={{ ...navLinkStyle, color: '#2c3e50', fontSize: '1.5rem' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate('/menu') && setIsMobileMenuOpen(false)}
                  role="menuitem"
              >
                Menu
              </Link>
              <a
                  href="#about"
                  style={{ ...navLinkStyle, color: '#2c3e50', fontSize: '1.5rem' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onKeyDown={(e) => e.key === 'Enter' && document.querySelector('#about').scrollIntoView() && setIsMobileMenuOpen(false)}
                  role="menuitem"
              >
                About
              </a>
              <a
                  href="#services"
                  style={{ ...navLinkStyle, color: '#2c3e50', fontSize: '1.5rem' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onKeyDown={(e) => e.key === 'Enter' && document.querySelector('#services').scrollIntoView() && setIsMobileMenuOpen(false)}
                  role="menuitem"
              >
                Services
              </a>
              <a
                  href="#contact-section"
                  style={{ ...navLinkStyle, color: '#2c3e50', fontSize: '1.5rem' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onKeyDown={(e) => e.key === 'Enter' && document.querySelector('#contact-section').scrollIntoView() && setIsMobileMenuOpen(false)}
                  role="menuitem"
              >
                Contact
              </a>
            </div>
        )}

        {/* Modern Hero Section */}
        {showHero && (
            <section style={heroStyle}>
              {/* Animated Background Elements */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                animation: 'float 20s ease-in-out infinite',
              }} />

              <div style={heroContentStyle}>
                <h1 style={heroTitleStyle}>
                  Welcome to Fatayer Time
                </h1>
                <p style={heroSubtitleStyle}>
                  Authentic Middle Eastern flavors delivered fresh to your door
                </p>

                {showButtons && (
                    <div style={{ marginTop: '2rem' }}>
                      <a
                          href="https://www.bistroo.nl/voorburg/restaurants/fatayer-time?utm_source=fatayer-time&utm_medium=bestelknop"
                          style={primaryButtonStyle}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                          }}
                      >
                        Order Online
                      </a>
                      <a
                          href="#services"
                          style={secondaryButtonStyle}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#fff';
                            e.target.style.color = '#ff6b35';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#fff';
                          }}
                      >
                        View Menu
                      </a>
                    </div>
                )}
              </div>
            </section>
        )}

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </>
  );
}

export default ModernHeader;