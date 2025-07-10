import React from 'react';
import PropTypes from 'prop-types';
import styles from './Spinner.module.css';

const Spinner = ({ size = 'medium', color = 'primary', className = '' }) => {
    const sizeClasses = {
        small: styles.small,
        medium: styles.medium,
        large: styles.large,
    };

    const colorClasses = {
        primary: styles.primary,
        secondary: styles.secondary,
        light: styles.light,
        dark: styles.dark,
    };

    return (
        <div
            className={`${styles.spinner} ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
            role="status"
            aria-label="Loading"
        >
            <div className={styles.spinnerInner}></div>
        </div>
    );
};

Spinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['primary', 'secondary', 'light', 'dark']),
    className: PropTypes.string,
};

export default Spinner;