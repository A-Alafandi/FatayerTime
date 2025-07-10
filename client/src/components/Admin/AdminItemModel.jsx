import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AdminDashboard.css';

const AdminItemModel = ({ item, onClose, onSave }) => {
    const [form, setForm] = useState({ ...item });

    useEffect(() => {
        if (item) setForm({ ...item });
    }, [item]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        onClose();
    };

    return (
        <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{item ? 'Edit Item' : 'Add Item'}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {['name', 'description', 'ingredients', 'category', 'imageUrl'].map(field => (
                            <div key={field}>
                                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                <input
                                    id={field}
                                    type={field === 'price' ? 'number' : 'text'}
                                    name={field}
                                    value={form[field] || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}

                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="vegetarian"
                                name="vegetarian"
                                checked={form.vegetarian || false}
                                onChange={handleChange}
                            />
                            <label htmlFor="vegetarian">Vegetarian</label>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AdminItemModel.propTypes = {
    item: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default AdminItemModel;