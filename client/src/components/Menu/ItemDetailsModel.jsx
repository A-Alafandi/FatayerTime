// ItemDetailsModel.jsx
import React from 'react';
import "./MenuPage.css";

export default function ItemDetailsModel({ item, onClose }) {
    if (!item) return null;

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{item.name}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <img src={item.imageUrl} alt={item.name} className="img-fluid mb-3" />
                        <p><strong>Beschrijving:</strong> {item.description}</p>
                        <p><strong>Ingrediënten:</strong> {item.ingredients}</p>
                        <p><strong>Prijs:</strong> € {(+item.price).toFixed(2)}</p>
                        {item.vegetarian && <span className="badge bg-success">🌿 Vegetarisch</span>}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Sluiten</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
