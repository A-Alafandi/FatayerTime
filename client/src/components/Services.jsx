import React from 'react';

function ModernServices() {
  const sectionStyle = {
    padding: '5rem 0',
    background: '#fff',
    position: 'relative',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '4rem',
  };

  const sectionPillStyle = {
    display: 'inline-block',
    backgroundColor: '#e8f5e8',
    color: '#28a745',
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

  const servicesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  };

  const serviceCardStyle = {
    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
    borderRadius: '20px',
    padding: '2.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 107, 53, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  };

  const iconStyle = {
    width: '60px',
    height: '60px',
    backgroundColor: '#ff6b35',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    color: '#fff',
  };

  const serviceTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '1rem',
  };

  const serviceDescStyle = {
    fontSize: '1rem',
    color: '#6c757d',
    lineHeight: '1.7',
    marginBottom: '1.5rem',
  };

  const serviceLinkStyle = {
    color: '#ff6b35',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
  };

  const services = [
    {
      icon: '🚚',
      title: 'Delivery & Pickup',
      description: 'No time to dine in? Order online easily and choose fast delivery or pickup. Always warm, fresh, and on time.',
      link: '#contact-section',
      features: ['Fast delivery', 'Online ordering', 'Always fresh']
    },
    {
      icon: '🎉',
      title: 'Catering & Events',
      description: 'Organizing a party, wedding, or corporate event? We provide delicious fatayers, wraps, and platters tailored to your needs.',
      link: '#contact-section',
      features: ['Custom platters', 'Event catering', 'Fresh preparation']
    },
    {
      icon: '⭐',
      title: 'Special Orders',
      description: 'From vegetarian options to halal and gluten-free requests – at Fatayer Time we accommodate everyone\'s preferences.',
      link: '#contact-section',
      features: ['Vegetarian options', 'Halal certified', 'Gluten-free available']
    }
  ];

  return (
      <section id="services" style={sectionStyle} aria-labelledby="services-title">
        <div style={containerStyle}>
          {/* Title Section */}
          <div style={titleStyle}>
            <div style={sectionPillStyle}>What We Offer</div>
            <h2 id="services-title" style={mainTitleStyle}>Our Services</h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6c757d',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Discover the variety of services we offer to make your dining experience exceptional
            </p>
          </div>

          {/* Services Grid */}
          <div style={servicesGridStyle} role="list">
            {services.map((service, index) => (
                <div
                    key={index}
                    style={serviceCardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.borderColor = '#ff6b35';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.1)';
                    }}
                    role="listitem"
                >
                  {/* Background Pattern */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(247, 147, 30, 0.05))',
                    borderRadius: '0 20px 0 100px',
                  }} />

                  <div style={iconStyle} aria-hidden="true">
                    {service.icon}
                  </div>

                  <h3 style={serviceTitleStyle}>{service.title}</h3>

                  <p style={serviceDescStyle}>{service.description}</p>

                  {/* Features List */}
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '1.5rem 0',
                  }} aria-label={`${service.title} features`}>
                    {service.features.map((feature, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                          fontSize: '0.9rem',
                          color: '#6c757d',
                        }}>
                                        <span style={{
                                          width: '6px',
                                          height: '6px',
                                          backgroundColor: '#ff6b35',
                                          borderRadius: '50%',
                                        }} />
                          {feature}
                        </li>
                    ))}
                  </ul>

                  <a
                      href={service.link}
                      style={serviceLinkStyle}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#e55a2b';
                        e.target.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#ff6b35';
                        e.target.style.transform = 'translateX(0)';
                      }}
                      aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                    <span style={{ fontSize: '0.8rem' }}>→</span>
                  </a>
                </div>
            ))}
          </div>

          {/* Call to Action */}
          <div style={{
            textAlign: 'center',
            marginTop: '4rem',
            padding: '3rem',
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            borderRadius: '20px',
            color: '#fff',
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}>
              Ready to Order?
            </h3>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2rem',
              opacity: 0.9,
            }}>
              Experience the authentic taste of Middle Eastern cuisine
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                  href="https://www.bistroo.nl/voorburg/restaurants/fatayer-time"
                  style={{
                    backgroundColor: '#fff',
                    color: '#ff6b35',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                  aria-label="Order online"
              >
                Order Online
              </a>
              <a
                  href="#contact-section"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#fff',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    border: '2px solid #fff',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#fff';
                    e.target.style.color = '#ff6b35';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#fff';
                  }}
                  aria-label="Contact us"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
  );
}

export default ModernServices;