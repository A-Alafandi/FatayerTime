import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert('Message sent!\n\n' + JSON.stringify(form, null, 2));
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1200);
  };

  return (
      <section id="contact" className="contact section py-5 bg-light">
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>
            <span>Need Help?</span> <span className="description-title">Contact Us</span>
          </p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          {/* Google Maps */}
          <div className="mb-5 rounded-4 overflow-hidden shadow-sm">
            <iframe
                style={{ width: '100%', height: 400, border: 0 }}
                title="Fatayer Time Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.568143638472!2d4.306881415879557!3d52.073284279732655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b727b93f6d73%3A0xa969ba66bb422b88!2sZuidwal%2094%2C%202512%20XP%20Den%20Haag!5e0!3m2!1sen!2snl!4v1692109557487!5m2!1sen!2snl"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="row gy-4">
            {/* Info Items */}
            <div className="col-md-6">
              <div className="row gy-4">
                <div className="col-12">
                  <div className="info-item d-flex align-items-center mb-4" data-aos="fade-up" data-aos-delay="200">
                    <i className="icon bi bi-geo-alt flex-shrink-0 me-3 fs-2 text-danger"></i>
                    <div>
                      <h3 className="mb-1">Address</h3>
                      <p className="mb-0">Zuidwal 94, 2512 XP Den Haag, Netherlands</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="info-item d-flex align-items-center mb-4" data-aos="fade-up" data-aos-delay="300">
                    <i className="icon bi bi-telephone flex-shrink-0 me-3 fs-2 text-danger"></i>
                    <div>
                      <h3 className="mb-1">Call Us</h3>
                      <p className="mb-0">+31 6 85108263</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="info-item d-flex align-items-center mb-4" data-aos="fade-up" data-aos-delay="400">
                    <i className="icon bi bi-envelope flex-shrink-0 me-3 fs-2 text-danger"></i>
                    <div>
                      <h3 className="mb-1">Email Us</h3>
                      <p className="mb-0">info@fatayertime.nl</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="info-item d-flex align-items-center mb-4" data-aos="fade-up" data-aos-delay="500">
                    <i className="icon bi bi-clock flex-shrink-0 me-3 fs-2 text-danger"></i>
                    <div>
                      <h3 className="mb-1">Opening Hours</h3>
                      <p className="mb-0">
                        <strong>Mon-Fri:</strong> 10:00 - 20:00; <strong>Sat:</strong> 08:00 - 18:00;<br />
                        <strong>Sun:</strong> 12:00 - 19:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-6">
              <form className="bg-white p-4 rounded-4 shadow-sm" onSubmit={handleSubmit}>
                <div className="row gy-3">
                  <div className="col-md-6">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="col-12">
                    <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="col-12">
                  <textarea
                      name="message"
                      rows="5"
                      className="form-control"
                      placeholder="Message"
                      value={form.message}
                      onChange={handleChange}
                      required
                  ></textarea>
                  </div>
                  <div className="col-12 text-end">
                    <button type="submit" className="btn btn-danger rounded-pill px-4" disabled={submitting}>
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}
