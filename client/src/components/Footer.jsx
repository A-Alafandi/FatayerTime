// src/components/Footer/Footer.jsx

import React from 'react';
import styles from '../main.css';

function Footer() {
    return (
        <footer className={styles.footer} role="contentinfo">
            <div className={styles.container}>
                <div className={styles.copyright}>
                    <p className={styles.slogan}>
                        Ook een website nodig? Wij helpen je graag!
                    </p>
                    <p>
                        <a
                            href="https://wa.me/31685108263"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.brandLink}
                            aria-label="Contact AfandiLabs via WhatsApp"
                        >
                            <span className={styles.brand}>AfandiLabs</span>
                        </a>
                    </p>
                </div>
                <a
                    href="/admin"
                    className={styles.adminLink}
                    aria-label="Admin dashboard login"
                >
                    Admin
                </a>
            </div>
        </footer>
    );
}

export default React.memo(Footer);
