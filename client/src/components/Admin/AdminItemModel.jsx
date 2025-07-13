import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './AdminDashboard.module.css';

const AdminItemModel = ({ item, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        ingredients: '',
        category: '',
        imageUrl: '',
        vegetarian: false,
        ...item,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const firstInputRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        if (item) {
            setForm({
                name: '',
                description: '',
                price: '',
                ingredients: '',
                category: '',
                imageUrl: '',
                vegetarian: false,
                ...item,
            });
        }
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, [item]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [onClose]);

    const validateForm = () => {
        const newErrors = {};
        if (!form.name?.trim()) newErrors.name = 'Name is required';
        if (!form.description?.trim()) newErrors.description = 'Description is required';
        if (!form.price || Number(form.price) <= 0) newErrors.price = 'Price must be greater than 0';
        if (!form.category?.trim()) newErrors.category = 'Category is required';
        if (form.imageUrl && !isValidUrl(form.imageUrl)) newErrors.imageUrl = 'Please enter a valid URL';
        return newErrors;
    };

    const isValidUrl = (string) => {
        try {
            // Add protocol if missing
            const url = string.match(/^https?:\/\//) ? string : `https://${string}`;
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = {
                ...form,
                price: Number(form.price),
                imageUrl: form.imageUrl
                    ? form.imageUrl.match(/^https?:\/\//)
                        ? form.imageUrl
                        : `https://${form.imageUrl}`
                    : '',
            };
            await onSave(formData);
            onClose();
        } catch (error) {
            setErrors({ submit: 'Failed to save item. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    const formFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'text', required: true },
        { name: 'price', label: 'Price (€)', type: 'number', required: true, min: 0, step: 0.01 },
        { name: 'ingredients', label: 'Ingredients', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text', required: true },
        { name: 'imageUrl', label: 'Image URL', type: 'url', required: false },
    ];

    return (
        <div className={styles.modalBackdrop} onKeyDown={handleKeyDown}>
            <div className={styles.modal} role="dialog" aria-modal="true" ref={modalRef}>
                <div className={styles.modalHeader}>
                    <h2>{item?.id ? 'Edit Item' : 'Add New Item'}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        disabled={isSubmitting}
                        className={styles.closeButton}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <div className={styles.modalContent}>
                    <div className={styles.formGroup}>
                        {formFields.map((field, index) => (
                            <div key={field.name} className={styles.formField}>
                                <label htmlFor={field.name} className={styles.formLabel}>
                                    {field.label}
                                    {field.required && <span className={styles.required}>*</span>}
                                </label>
                                <input
                                    ref={index === 0 ? firstInputRef : null}
                                    id={field.name}
                                    type={field.type}
                                    name={field.name}
                                    value={form[field.name] || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                    min={field.min}
                                    step={field.step}
                                    disabled={isSubmitting}
                                    className={styles.formInput}
                                    aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                                />
                                {errors[field.name] && (
                                    <span id={`${field.name}-error`} className={styles.errorMessage}>
                                        {errors[field.name]}
                                    </span>
                                )}
                            </div>
                        ))}
                        <div className={styles.checkboxGroup}>
                            <input
                                type="checkbox"
                                id="vegetarian"
                                name="vegetarian"
                                checked={form.vegetarian || false}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className={styles.checkboxInput}
                            />
                            <label htmlFor="vegetarian" className={styles.formLabel}>Vegetarian</label>
                        </div>
                    </div>
                    {errors.submit && (
                        <div className={styles.errorMessage}>{errors.submit}</div>
                    )}
                    <div className={styles.modalFooter}>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={styles.saveButton}
                            aria-label="Save item"
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className={styles.cancelButton}
                            aria-label="Cancel"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

AdminItemModel.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        ingredients: PropTypes.string,
        category: PropTypes.string,
        imageUrl: PropTypes.string,
        vegetarian: PropTypes.bool,
    }),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default AdminItemModel;