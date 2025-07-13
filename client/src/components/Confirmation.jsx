import React from 'react';
import PropTypes from 'prop-types';
import './Confirmation.css';

const Confirmation = ({
                               title = 'Confirm Action',
                               message,
                               confirmText = 'Confirm',
                               cancelText = 'Cancel',
                               onConfirm,
                               onCancel,
                               danger = true
                           }) => {
    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="confirmation-modal">
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button
                        className={`cancel-button ${danger ? 'danger-mode' : ''}`}
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                    <button
                        className={`confirm-button ${danger ? 'danger-mode' : ''}`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

Confirmation.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    danger: PropTypes.bool
};

export default Confirmation;