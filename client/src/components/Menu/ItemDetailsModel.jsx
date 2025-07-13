import React, { useEffect, useRef } from 'react';
import "./MenuPage.css";

export default function ItemDetailsModal({ item, onClose }) {
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);

    // Focus management and keyboard handling
    useEffect(() => {
        if (item) {
            // Focus the close button when modal opens
            closeButtonRef.current?.focus();

            // Prevent body scrolling
            document.body.style.overflow = 'hidden';

            // Handle escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleEscape);

            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = 'unset';
            };
        }
    }, [item, onClose]);

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === modalRef.current) {
            onClose();
        }
    };

    // Handle image error
    const handleImageError = (e) => {
        e.target.src = '/images/fallback-food.jpg';
    };

    // Format price safely
    const formatPrice = (price) => {
        const numPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
        return numPrice.toFixed(2);
    };

    if (!item) return null;

    return (
        <div
            className="menu-modal"
            ref={modalRef}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className="menu-modal-content">
                <button
                    ref={closeButtonRef}
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Sluit details"
                >
                    ×
                </button>

                <h2 id="modal-title" className="modal-title">
                    {item.name}
                </h2>

                <img
                    src={item.imageUrl || '/images/fallback-food.jpg'}
                    alt={item.name}
                    className="modal-img"
                    onError={handleImageError}
                />

                <div id="modal-description">
                    <p className="modal-price">
                        <strong>Prijs:</strong> € {formatPrice(item.price)}
                    </p>

                    {item.description && (
                        <div className="modal-section">
                            <p className="modal-label">Beschrijving:</p>
                            <p className="modal-desc">{item.description}</p>
                        </div>
                    )}

                    {item.ingredients && (
                        <div className="modal-section">
                            <p className="modal-label">Ingrediënten:</p>
                            <p className="modal-desc">{item.ingredients}</p>
                        </div>
                    )}

                    {item.vegetarian && (
                        <div className="modal-badges">
                            <span className="badge badge-success">
                                🌿 Vegetarisch
                            </span>
                        </div>
                    )}
                </div>

                <div className="modal-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Sluiten
                    </button>
                </div>
            </div>
        </div>
    );
}