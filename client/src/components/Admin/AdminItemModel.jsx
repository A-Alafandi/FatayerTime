import React, { useState, useEffect } from 'react';

export default function ItemModal({ item, onClose, onSave }) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        ingredients: '',
        category: '',
        imageUrl: '',
        price: 0,
        vegetarian: false,
    });

    useEffect(() => {
        if (item) setForm(item);
    }, [item]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(form);
        onClose();
    };

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{item ? 'Edit Item' : 'Add Item'}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {['name', 'description', 'ingredients', 'category', 'imageUrl', 'price'].map((field) => (
                                <div key={field} className="mb-3">
                                    <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        type={field === 'price' ? 'number' : 'text'}
                                        className="form-control"
                                        name={field}
                                        value={form[field] || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            ))}
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="vegetarian"
                                    checked={form.vegetarian || false}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">Vegetarian</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
