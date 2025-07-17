import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../Main.css';

function Confirmation({ open, title, message, confirmText = 'Yes', cancelText = 'No', onConfirm, onCancel }) {
    const dialogRef = useRef();

    useEffect(() => {
        if (open && dialogRef.current) {
            const btn = dialogRef.current.querySelector('button');
            btn && btn.focus();
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        function onKeyDown(e) {
            if (e.key === 'Escape') onCancel();
            if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === dialogRef.current.querySelector('.confirm-btn')) {
                e.preventDefault();
                onConfirm();
            }
        }
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [open, onCancel, onConfirm]);

    if (!open) return null;

    return (
        <div className="confirm-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirmation-title" ref={dialogRef}>
            <div className="confirm-dialog">
                <h2 id="confirmation-title" className="confirm-title">{title}</h2>
                <div className="confirm-message">{message}</div>
                <div className="confirm-actions">
                    <button className="confirm-btn" onClick={onConfirm} aria-label={confirmText}>
                        {confirmText}
                    </button>
                    <button className="cancel-btn" onClick={onCancel} aria-label={cancelText}>
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}

Confirmation.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default React.memo(Confirmation);
