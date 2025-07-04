import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'
function SimpleHeader({ showHero = true, showButtons = true }) {
  const location = useLocation()
  return (
    <>
      {/* Header */}
      <header
        id="simple-header"
        className="header d-flex align-items-center fixed-top"
        style={{ backgroundColor: showHero ? 'transparent' : '#fff' }}
      >
        <div className="simple-header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
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
          <nav id=" navmenu" className="  navmenu">
            <ul>
              <li>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      {showHero && (
        <section id="menupage" className=".simple-hero-section">
          <div className=".simple-hero-overlay"></div>
          <div className="container-fluid p-0 text-center text-white .simple-hero-content">
            <h2 className=".simple-hero-title mt-5">
              Enjoy Our Fresh Made Fatayer
            </h2>
          </div>
        </section>
      )}
    </>
  )
}

export default SimpleHeader
