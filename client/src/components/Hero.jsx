import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main.css';

function HeaderHero({ showHero = true, showButtons = true }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleNav = () => setNavOpen(open => !open);

    return (
        <>
            <header id="hero" className={`header d-flex align-items-center sticky-top${isScrolled ? ' scrolled' : ''}`}>
                <div className="container position-relative d-flex align-items-center justify-content-between">
                    <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
                        <img src={logo} alt="Fatayer Time Logo" style={{ height: '48px', marginRight: '10px' }} />
                        <h1 className="sitename m-0" style={{ fontSize: '2rem' }}>
                            Fatayer <span style={{ color: '#ce1212' }}>Time</span>
                        </h1>
                    </Link>

                    <nav id="navmenu" className={`navmenu${navOpen ? ' open' : ''}`}>
                        <ul>
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
                            </li>
                            <li>
                                <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>Menu</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
                            </li>
                        </ul>
                        {/* Refactored: Use button instead of <i> for nav toggle */}
                        <button
                            type="button"
                            className="mobile-nav-toggle d-xl-none bi bi-list"
                            aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
                            onClick={toggleNav}
                            style={{
                                fontSize: '2rem',
                                cursor: 'pointer',
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                marginLeft: '1rem',
                                color: 'inherit'
                            }}
                        />
                    </nav>
                </div>
            </header>

            {showHero && (
                <section id="home" className="hero section light-background">
                    <div className="container">
                        <div className="row gy-4 justify-content-center justify-content-lg-between align-items-center">
                            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
                                <h1 data-aos="fade-up" className="display-4 fw-bold mb-3" style={{ color: '#ce1212' }}>
                                    Handmade With Love<br />Every Day
                                </h1>
                                <h5 className="mb-4" style={{ color: '#37373f' }}>Authentic Middle Eastern Bakery</h5>
                                {showButtons && (
                                    <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start" data-aos="fade-up" data-aos-delay="200">
                                        <a
                                            href="https://www.bistroo.nl/voorburg/restaurants/fatayer-time?utm_source=fatayer-time&utm_medium=bestelknop"
                                            className="btn btn-primary btn-lg me-sm-3 mb-3 mb-sm-0"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Order Online
                                        </a>
                                        <a href="/services" className="btn btn-outline-dark btn-lg">
                                            View Menu
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-5 order-1 order-lg-2 hero-img d-none d-lg-block" data-aos="zoom-out">
                                <img
                                    src="/assets/img/hero-img.png"
                                    className="img-fluid animated"
                                    alt="Fatayer Time Hero"
                                    style={{ maxHeight: 350, borderRadius: '1.5rem' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default HeaderHero;
