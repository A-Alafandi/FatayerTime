import React from 'react'

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container-fluid p-0 text-center text-white hero-content">
        <h2 className="hero-title">Fatayer Time te Den Haag</h2>
        <div className="hero-buttons">
          <a
            href="https://www.bistroo.nl/voorburg/restaurants/fatayer-time?utm_source=fatayer-time&utm_medium=bestelknop"
            className="btn btn-primary me-3"
          >
            Online Bestellen
          </a>
          <a href="#services" className="btn btn-outline-light">
            Afhalen
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
