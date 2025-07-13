// src/components/NotFound/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../main.css';

function NotFound() {
    return (
        <main className={styles.container} aria-label="Page not found">
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Page Not Found</h2>
                <p className={styles.text}>
                    Oops! The page you’re looking for doesn’t exist or has been moved.<br />
                    Try going back to the <Link to="/" className={styles.link}>home page</Link>.
                </p>
            </div>
        </main>
    );
}

export default React.memo(NotFound);
