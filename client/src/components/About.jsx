// src/components/About/About.jsx

import React from 'react';
import styles from '../main.css';

function About() {
  return (
      <section id="about" className={styles.aboutSection} aria-labelledby="about-title">
        <div className={styles.aboutContent}>
          <h2 id="about-title" className={styles.aboutTitle}>
            About Fatayer Time
          </h2>
          <p className={styles.aboutText}>
            Fatayer Time is a family-run bakery specializing in authentic Middle Eastern pies—
            <strong> handmade with love and fresh ingredients every day in The Hague.</strong>
            <br /><br />
            Our signature fatayers are baked to perfection, blending traditional flavors with a modern twist.
            Whether you want a quick snack, a hearty meal, or catering for your next event,
            <strong> we have something for everyone!</strong>
          </p>
          <ul className={styles.features}>
            <li>✓ Fresh, authentic ingredients</li>
            <li>✓ Vegetarian and spicy options</li>
            <li>✓ Party & event catering</li>
            <li>✓ Order online or via WhatsApp</li>
          </ul>
        </div>
      </section>
  );
}

export default React.memo(About);
