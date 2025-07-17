import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../Main.css';

const Notification = ({
                          message,
                          type = 'error',
                          onClose,
                          autoDismiss = 5000,
                          position = 'top-right',
                          showCloseButton = true
                      }) => {
    const [isExiting, setIsExiting] = useState(false);

    // Move handleClose before useEffect, so it's safe to reference in deps
    const handleClose = React.useCallback(() => {
        setIsExiting(true);
        setTimeout(onClose, 300);
    }, [onClose]);

    useEffect(() => {
        if (!message) return;
        setIsExiting(false);
        if (autoDismiss) {
            const timer = setTimeout(() => handleClose(), autoDismiss);
            return () => clearTimeout(timer);
        }
    }, [message, autoDismiss, handleClose]); // FIXED: include handleClose

    if (!message) return null;

    return (
        <div
            className={`notification ${type} ${position} ${isExiting ? 'exiting' : ''}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="content">
                <div className="icon">
                    {type === 'success' && '✓'}
                    {type === 'error' && '⚠'}
                    {type === 'warning' && '⚠'}
                    {type === 'info' && 'i'}
                </div>
                <span className="message">{message}</span>
            </div>
            {showCloseButton && (
                <button className="close-btn" onClick={handleClose} aria-label="Dismiss notification">
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
