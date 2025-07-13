// src/components/Contact/Contact.jsx

import React from 'react';
import styles from '../main.css';

function Contact() {
  return (
      <section id="contact-section" className={styles.contactSection} aria-labelledby="contact-title">
        <div className={styles.contactContent}>
          <h2 id="contact-title" className={styles.contactTitle}>
            Contact & Location
          </h2>
          <div className={styles.contactDetails}>
            <div className={styles.contactInfo}>
              <p>
                <strong>Address:</strong><br />
                Zuidwal 94, 2512 XP Den Haag, Netherlands
              </p>
              <p>
                <strong>Phone:</strong><br />
                <a href="tel:+31685108263" className={styles.link}>+31 6 85108263</a>
              </p>
              <p>
                <strong>Email:</strong><br />
                <a href="mailto:info@fatayertime.nl" className={styles.link}>info@fatayertime.nl</a>
              </p>
              <p>
                <strong>WhatsApp:</strong><br />
                <a
                    href="https://wa.me/31685108263"
                    className={`${styles.link} ${styles.whatsappBtn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >Message us on WhatsApp</a>
              </p>
            </div>
            <div className={styles.mapBlock}>
              <iframe
                  title="Fatayer Time Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.568143638472!2d4.306881415879557!3d52.073284279732655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b727b93f6d73%3A0xa969ba66bb422b88!2sZuidwal%2094%2C%202512%20XP%20Den%20Haag!5e0!3m2!1sen!2snl!4v1692109557487!5m2!1sen!2snl"
                  className={styles.map}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
  );
}

export default React.memo(Contact);
