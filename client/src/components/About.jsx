import React from 'react';
import Fatayer from '../assets/fatayer.png';

function ModernAbout() {
  const sectionStyle = {
    padding: '5rem 0',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    position: 'relative',
    overflow: 'hidden',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '3rem',
  };

  const sectionPillStyle = {
    display: 'inline-block',
    backgroundColor: '#ff6b35',
    color: '#fff',
    padding: '0.5rem 1.5rem',
    borderRadius: '25px',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const mainTitleStyle = {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '1rem',
  };

  const contentStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '3rem',
    alignItems: 'center',
  };

  const imageContainerStyle = {
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    transform: 'perspective(1000px) rotateY(-5deg)',
    transition: 'transform 0.3s ease',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'transform 0.3s ease',
  };

  const textContainerStyle = {
    padding: '2rem',
  };

  const subtitleStyle = {
    fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    lineHeight: '1.4',
  };

  const textStyle = {
    fontSize: '1.1rem',
    color: '#6c757d',
    lineHeight: '1.8',
    marginBottom: '1.5rem',
  };

  const highlightStyle = {
    color: '#ff6b35',
    fontWeight: '600',
  };

  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  };

  const statItemStyle = {
    textAlign: 'center',
  };

  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#ff6b35',
    display: 'block',
  };

  const statLabelStyle = {
    fontSize: '0.9rem',
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '0.5rem',
  };

  return (
      <section id="about" style={sectionStyle}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ff6b35" fill-opacity="0.03"%3E%3Cpolygon points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5,
        }} />

        <div style={containerStyle}>
          {/* Title Section */}
          <div style={titleStyle}>
            <div style={sectionPillStyle}>Our Story</div>
            <h2 style={mainTitleStyle}>About Fatayer Time</h2>
          </div>

          {/* Main Content */}
          <div style={contentStyle}>
            {/* Image */}
            <div
                style={imageContainerStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg) scale(1)';
                }}
            >
              <img
                  src={Fatayer}
                  alt="Delicious Fatayer"
                  style={imageStyle}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(247, 147, 30, 0.1))',
              }} />
            </div>

            {/* Text Content */}
            <div style={textContainerStyle}>
              <h3 style={subtitleStyle}>
                Authentic Middle Eastern Flavors in <span style={highlightStyle}>The Hague</span>
              </h3>
              <p style={textStyle}>
                Fatayer Time in Den Haag offers a delicious selection of traditional and modern fatayers,
                <span style={highlightStyle}> artisanally prepared</span> with diverse fillings including specially
                seasoned ground meat, Syrian cheese, and muhammara sauce.
              </p>
              <p style={textStyle}>
                Our popular options include <span style={highlightStyle}>Fatayer Toshka</span>, chicken curry with cheese,
                and pastrami cheese - perfect for a flavorful lunch or quick bite.
              </p>
              <p style={textStyle}>
                Come visit us and experience the authentic taste of the Middle East at Fatayer Time!
              </p>

              {/* Call to Action */}
              <div style={{ marginTop: '2rem' }}>
                <a
                    href="#services"
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#ff6b35',
                      color: '#fff',
                      padding: '1rem 2rem',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
                    }}
                >
                  Discover Our Menu
                </a>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div style={statsStyle}>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>5+</span>
              <span style={statLabelStyle}>Years Experience</span>
            </div>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>15+</span>
              <span style={statLabelStyle}>Fatayer Varieties</span>
            </div>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>1000+</span>
              <span style={statLabelStyle}>Happy Customers</span>
            </div>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>100%</span>
              <span style={statLabelStyle}>Fresh Daily</span>
            </div>
          </div>
        </div>
      </section>
  );
}

export default ModernAbout;

