import React from 'react';
import HeaderHero from './HeaderHero';
import About from './About';
import Services from './Services';
import MenuPage from './Menu/MenuPage';
import OpeningHours from './OpeningHours';
import Contact from './Contact';
import Footer from './Footer';

function HomePage() {
    return (
        <>
            {/* Skip link for accessibility */}
            <a href="#main-content" className="skip-link">Skip to main content</a>

            {/* Header & Hero Section */}
            <HeaderHero />

            <main id="main-content">
                {/* About Section */}
                <About />

                {/* Services Section */}
                <Services />

                {/* Menu Section */}
                <section id="menu-section" aria-labelledby="menu-section-title">
                    <h2 id="menu-section-title" className="visually-hidden">Menu</h2>
                    <MenuPage />
                </section>

                {/* Opening Hours Section */}
                <OpeningHours />

                {/* Contact Section */}
                <Contact />
            </main>

            <Footer />
        </>
    );
}

export default HomePage;