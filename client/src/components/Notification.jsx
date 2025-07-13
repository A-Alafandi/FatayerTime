import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Notification.css';

const Notification = ({
                          message,
                          type = 'error',
                          onClose,
                          autoDismiss = 5000,
                          position = 'top-right',
                          showCloseButton = true
                      }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (!message) return;

        setIsExiting(false);

        if (autoDismiss) {
            const timer = setTimeout(() => {
                handleClose();
            }, autoDismiss);

            return () => clearTimeout(timer);
        }
    }, [message, autoDismiss]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(onClose, 300); // Match animation duration
    };

    if (!message) return null;

    return (
        <div
            className={`${styles.notification} ${styles[type]} ${styles[position]} ${isExiting ? styles.exiting : ''}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className={styles.content}>
                <div className={styles.icon}>
                    {type === 'success' && '✓'}
                    {type === 'error' && '⚠'}
                    {type === 'warning' && '⚠'}
                    {type === 'info' && 'i'}
                </div>
                <span className={styles.message}>{message}</span>
            </div>
            {showCloseButton && (
                <button
                    className={styles.closeButton}
                    onClick={handleClose}
                    aria-label="Dismiss notification"
                >
                    &times;
                </button>
            )}
        </div>
    );
};

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf(['error', 'success', 'warning', 'info']),
    onClose: PropTypes.func.isRequired,
    autoDismiss: PropTypes.number,
    position: PropTypes.oneOf([
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
        'top-center',
        'bottom-center'
    ]),
    showCloseButton: PropTypes.bool
};

export default Notification;