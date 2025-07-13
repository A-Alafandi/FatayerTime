// src/components/ItemDetailsModal/ItemDetailsModal.jsx

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './MenuPage.module.css';

const fallbackImg = '/images/fallback-food.jpg';

function ItemDetailsModal({ item, onClose }) {
    const [imgError, setImgError] = useState(false);
    const modalRef = useRef();

    // Accessibility: Trap focus and close on Escape
    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    // Click outside closes modal
    function handleBackdropClick(e) {
        if (e.target === e.currentTarget) onClose();
    }

    if (!item) return null;

    return (
        <div
            className={styles.modalBackdrop}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            onClick={handleBackdropClick}
            ref={modalRef}
        >
            <div className={styles.modal}>
                <button
                    className={styles.closeButton}
                    aria-label="Close details"
                    onClick={onClose}
                    autoFocus
                >
                    ×
                </button>
                <h2 className={styles.title}>{item.name}</h2>
                <div className={styles.content}>
                    <div className={styles.imageBlock}>
                        <img
                            src={imgError || !item.imageUrl ? fallbackImg : item.imageUrl}
                            alt={item.name}
                            onError={() => setImgError(true)}
                            className={styles.image}
                        />
                        <div className={styles.badges}>
                            {item.vegetarian && <span className={`${styles.badge} ${styles.veg}`} aria-label="Vegetarian">🥗</span>}
                            {item.spicy && <span className={`${styles.badge} ${styles.spicy}`} aria-label="Spicy">🌶️</span>}
                            {item.popular && <span className={`${styles.badge} ${styles.popular}`} aria-label="Popular">★</span>}
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.label}>Category:</div>
                        <div className={styles.value}>{item.category}</div>
                        <div className={styles.label}>Description:</div>
                        <div className={styles.value}>{item.description}</div>
                        {item.ingredients && item.ingredients.length > 0 && (
                            <>
                                <div className={styles.label}>Ingredients:</div>
                                <div className={styles.value}>
                                    {item.ingredients.join(', ')}
                                </div>
                            </>
                        )}
                        <div className={styles.label}>Price:</div>
                        <div className={styles.price}>€{item.price?.toFixed(2) ?? '-'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ItemDetailsModal.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        category: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        imageUrl: PropTypes.string,
        vegetarian: PropTypes.bool,
        spicy: PropTypes.bool,
        popular: PropTypes.bool,
        ingredients: PropTypes.array,
    }),
    onClose: PropTypes.func.isRequired,
};

export default ItemDetailsModal;
