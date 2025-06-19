import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'

function HeaderHero({ showHero = true, showButtons = true }) {
  const location = useLocation()

  return (
    <>
      {/* Header */}
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
        style={{ backgroundColor: showHero ? 'transparent' : '#fff' }}
      >
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <a
            href="/"
            className="logo d-flex align-items-center me-auto me-xl-0"
          >
            <img src={logo} alt="Fatayer Time Logo" />
            <h1
              className="sitename"
              style={{ color: showHero ? 'black' : '#222' }}
            >
              Fatayer <span style={{ color: 'green' }}>Time</span>
            </h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <Link
                  to="/"
                  className={location.pathname === '/' ? 'active' : ''}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className={location.pathname === '/menu' ? 'active' : ''}
                >
                  Menu
                </Link>
              </li>
              <li>
                <a href="#about">Over Ons</a>
              </li>
              <li>
                <a href="#services">Diensten</a>
              </li>
              <li>
                <a href="#contact-section">Contact</a>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      {showHero && (
        <section id="home" className="hero-section">
          <div className="hero-overlay"></div>
          <div className="container-fluid p-0 text-center text-white hero-content">
            <h2 className="hero-title mt-5">Fatayer Time Den Haag</h2>

            {showButtons && (
              <div className="hero-buttons mt-4">
                <a
                  href="https://www.bistroo.nl/voorburg/restaurants/fatayer-time?utm_source=fatayer-time&utm_medium=bestelknop"
                  className="btn btn-success me-3"
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
  )
}

export default HeaderHero
