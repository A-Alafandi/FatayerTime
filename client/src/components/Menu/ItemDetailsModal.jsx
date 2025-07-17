import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Main.css';

const fallbackImg = '/assets/img/menu/fallback-food.jpg';

function ItemDetailsModal({ item, onClose }) {
    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    if (!item) return null;

    let ingredientsDisplay = null;
    if (Array.isArray(item.ingredients) && item.ingredients.length > 0) {
        ingredientsDisplay = item.ingredients.join(', ');
    } else if (typeof item.ingredients === 'string' && item.ingredients.trim() !== '') {
        ingredientsDisplay = item.ingredients;
    }

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" onClick={onClose}></button>
                    <div className="modal-body row">
                        <div className="col-md-5 d-flex align-items-center">
                            <img
                                src={item.imageUrl || fallbackImg}
                                alt={item.name}
                                className="img-fluid rounded shadow"
                                style={{ width: '100%' }}
                                onError={e => { e.target.src = fallbackImg; }}
                            />
                        </div>
                        <div className="col-md-7">
                            <h2 className="mb-2" style={{ color: '#ce1212' }}>{item.name}</h2>
                            <div className="mb-3">
                                {item.vegetarian && <span className="badge bg-success me-1">🥗 Vegetarian</span>}
                                {item.spicy && <span className="badge bg-danger me-1">🌶️ Spicy</span>}
                                {item.popular && <span className="badge bg-warning text-dark">★ Popular</span>}
                            </div>
                            <div className="mb-2"><strong>Category:</strong> {item.category || '-'}</div>
                            <div className="mb-2"><strong>Description:</strong> {item.description || '-'}</div>
                            {ingredientsDisplay && (
                                <div className="mb-2"><strong>Ingredients:</strong> {ingredientsDisplay}</div>
                            )}
                            <div className="mb-2"><strong>Price:</strong> €{typeof item.price === 'number' ? item.price.toFixed(2) : '-'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ItemDetailsModal.propTypes = {
    item: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};

export default ItemDetailsModal;
