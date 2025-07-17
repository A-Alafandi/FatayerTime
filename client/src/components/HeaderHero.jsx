import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../Main.css';

function HeaderHero({ showHero = true, showButtons = true }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <>
        <header className={`modern-header${isScrolled ? ' scrolled' : ''}`}>
          <div className="header-container">
            <Link to="/" className="logo" aria-label="Fatayer Time Home">
              <img src={logo} alt="Fatayer Time Logo" />
              <span>Fatayer <span className="primary-text">Time</span></span>
            </Link>
            {/* Navigation or menu if needed */}
          </div>
        </header>
        {showHero && (
            <section className="hero-section">
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <h1 className="hero-title">Welcome to Fatayer Time</h1>
                {showButtons && (
                    <div className="hero-buttons">
                      <a
                          href="https://www.bistroo.nl/voorburg/restaurants/fatayer-time?utm_source=fatayer-time&utm_medium=bestelknop"
                          className="btn btn-primary me-3"
                          rel="noopener noreferrer"
                          target="_blank"
                      >
                        Online Bestellen
                      </a>
                      <a href="#services" className="btn btn-outline-light">
                        Afhalen
                      </a>
                    </div>
                )}
              </div>
            </section>
        )}
      </>
  );
}

export default HeaderHero;
