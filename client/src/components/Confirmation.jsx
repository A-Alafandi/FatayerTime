// src/components/Confirmation/Confirmation.jsx

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Confirmation.module.css';

function Confirmation({ open, title, message, confirmText = 'Yes', cancelText = 'No', onConfirm, onCancel }) {
    const dialogRef = useRef();

    // Focus the confirm button on open
    useEffect(() => {
        if (open && dialogRef.current) {
            const btn = dialogRef.current.querySelector('button');
            btn && btn.focus();
        }
    }, [open]);

    // Keyboard: close on Escape, handle Enter/Space for confirm
    useEffect(() => {
        if (!open) return;
        function onKeyDown(e) {
            if (e.key === 'Escape') onCancel();
            if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === dialogRef.current.querySelector(`.${styles.confirmBtn}`)) {
                e.preventDefault();
                onConfirm();
            }
        }
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [open, onCancel, onConfirm]);

    if (!open) return null;

    return (
        <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="confirmation-title" ref={dialogRef}>
            <div className={styles.dialog}>
                <h2 id="confirmation-title" className={styles.title}>{title}</h2>
                <div className={styles.message}>{message}</div>
                <div className={styles.actions}>
                    <button
                        className={styles.confirmBtn}
                        onClick={onConfirm}
                        aria-label={confirmText}
                    >
                        {confirmText}
                    </button>
                    <button
                        className={styles.cancelBtn}
                        onClick={onCancel}
                        aria-label={cancelText}
                    >
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
