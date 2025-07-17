import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const services = [
  { icon: "bi-bag-check-fill", title: "Takeaway", desc: "Order your favorite fatayer and pick it up fresh from our shop." },
  { icon: "bi-truck", title: "Delivery", desc: "Enjoy delicious food delivered hot to your doorstep in Den Haag." },
  { icon: "bi-people-fill", title: "Catering", desc: "Perfect for parties, office events, and special occasions." },
  { icon: "bi-cup-hot-fill", title: "Fresh Pastries", desc: "Handmade every day with authentic ingredients and traditional recipes." },
];

export default function Services() {
  return (
      <section id="services" className="services section bg-light py-5">
        <div className="container">
          <div className="section-title text-center mb-5">
            <div className="d-inline-block bg-light text-danger px-4 py-2 rounded-pill fw-semibold mb-2" style={{ background: "#fff0f0" }}>
              What We Offer
            </div>
            <h2 className="display-5 fw-bold text-danger" style={{ fontFamily: "'Amatic SC', cursive", letterSpacing: 2, fontSize: '2.5rem' }}>
              Our Services
            </h2>
          </div>
          <div className="row g-4">
            {services.map((service, idx) => (
                <div className="col-md-6 col-lg-3" key={idx}>
                  <div className="bg-white rounded-4 shadow-sm text-center p-4 h-100 d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex align-items-center justify-content-center mb-3" style={{ width: 60, height: 60, borderRadius: '50%', background: '#ce1212' }}>
                      <i className={`bi ${service.icon} text-white fs-2`}></i>
                    </div>
                    <h5 className="fw-bold mb-2" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: 1 }}>{service.title}</h5>
                    <p className="text-muted small">{service.desc}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}
