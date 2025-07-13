// src/components/Spinner/Spinner.jsx

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Spinner.module.css';

const sizePx = {
    small: 24,
    medium: 40,
    large: 64,
};

function Spinner({ size = 'medium', color = 'primary', className = '' }) {
    const spinnerSize = sizePx[size] || sizePx.medium;
    const colorClass =
        color === 'secondary'
            ? styles.spinnerSecondary
            : color === 'danger'
                ? styles.spinnerDanger
                : color === 'gray'
                    ? styles.spinnerGray
                    : styles.spinnerPrimary;

    return (
        <div
            className={`${styles.spinner} ${colorClass} ${className}`}
            role="status"
            aria-label="Loading"
            style={{ width: spinnerSize, height: spinnerSize }}
        >
            <span className={styles.srOnly}>Loading...</span>
            <svg
                width={spinnerSize}
                height={spinnerSize}
                viewBox="0 0 50 50"
                className={styles.spinnerSvg}
                aria-hidden="true"
            >
                <circle
                    className={styles.spinnerCircle}
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                />
            </svg>
        </div>
    );
}

Spinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['primary', 'secondary', 'danger', 'gray']),
    className: PropTypes.string,
};

export default React.memo(Spinner);
