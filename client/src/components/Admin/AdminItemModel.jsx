import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AdminDashboard.module.css'; // Use the same CSS module as dashboard

function AdminItemModel({ item, onSave, onClose }) {
    const [form, setForm] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        imageUrl: '',
        vegetarian: false,
        spicy: false,
        popular: false,
        ingredients: ''
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [saving, setSaving] = useState(false);
    const [imageFallback, setImageFallback] = useState(false);

    const modalRef = useRef();
    const firstInputRef = useRef();

    // Initialize/reset form when opened
    useEffect(() => {
        setForm({
            name: item?.name || '',
            category: item?.category || '',
            description: item?.description || '',
            price: item?.price?.toString() || '',
            imageUrl: item?.imageUrl || '',
            vegetarian: !!item?.vegetarian,
            spicy: !!item?.spicy,
            popular: !!item?.popular,
            ingredients: item?.ingredients ? item.ingredients.join(', ') : ''
        });
        setErrors({});
        setGeneralError('');
        setSaving(false);
        setImageFallback(false);
        // Focus first input for accessibility
        firstInputRef.current?.focus();
    }, [item]);

    // Trap focus inside modal
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape') onClose();
            // Trap focus
            if (e.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll('input, textarea, button, select, [tabindex]:not([tabindex="-1"])');
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
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Form validation
    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required.';
        if (!form.category.trim()) newErrors.category = 'Category is required.';
        if (!form.price || isNaN(parseFloat(form.price))) newErrors.price = 'Valid price is required.';
        if (!form.description.trim()) newErrors.description = 'Description is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value
        }));
        setErrors(errs => ({ ...errs, [name]: undefined }));
    };

    // Save handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSaving(true);
        setGeneralError('');
        try {
            await onSave({
                ...form,
                price: parseFloat(form.price),
                ingredients: form.ingredients
                    ? form.ingredients.split(',').map(s => s.trim()).filter(Boolean)
                    : [],
            });
        } catch (err) {
            setGeneralError(err.message || 'Failed to save item.');
            setSaving(false);
        }
    };

    // Image fallback to default if broken
    const handleImgError = () => {
        if (!imageFallback) {
            setForm(f => ({ ...f, imageUrl: '/images/fallback-food.jpg' }));
            setImageFallback(true);
        }
    };

    return (
        <div className={styles.modalBackdrop} tabIndex={-1} ref={modalRef} aria-modal="true" role="dialog">
            <div className={styles.modal}>
                <h3 className={styles.modalTitle}>{item ? 'Edit Menu Item' : 'Add New Item'}</h3>
                <form onSubmit={handleSubmit} autoComplete="off" className={styles.modalForm}>
                    <div className={styles.modalField}>
                        <label htmlFor="name">Name<span aria-hidden="true" style={{ color: '#ff6b35' }}>*</span></label>
                        <input
                            ref={firstInputRef}
                            id="name"
                            name="name"
                            type="text"
                            className={styles.input}
                            value={form.name}
                            onChange={handleChange}
                            required
                            disabled={saving}
                        />
                        {errors.name && <div className={styles.fieldError}>{errors.name}</div>}
                    </div>
                    <div className={styles.modalField}>
                        <label htmlFor="category">Category<span aria-hidden="true" style={{ color: '#ff6b35' }}>*</span></label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            className={styles.input}
                            value={form.category}
                            onChange={handleChange}
                            required
                            disabled={saving}
                        />
                        {errors.category && <div className={styles.fieldError}>{errors.category}</div>}
                    </div>
                    <div className={styles.modalField}>
                        <label htmlFor="price">Price (€)<span aria-hidden="true" style={{ color: '#ff6b35' }}>*</span></label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            className={styles.input}
                            value={form.price}
                            onChange={handleChange}
                            required
                            disabled={saving}
                        />
                        {errors.price && <div className={styles.fieldError}>{errors.price}</div>}
                    </div>
                    <div className={styles.modalField}>
                        <label htmlFor="description">Description<span aria-hidden="true" style={{ color: '#ff6b35' }}>*</span></label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className={styles.textarea}
                            value={form.description}
                            onChange={handleChange}
                            required
                            disabled={saving}
                        />
                        {errors.description && <div className={styles.fieldError}>{errors.description}</div>}
                    </div>
                    <div className={styles.modalField}>
                        <label htmlFor="ingredients">Ingredients</label>
                        <input
                            id="ingredients"
                            name="ingredients"
                            type="text"
                            className={styles.input}
                            placeholder="Comma-separated"
                            value={form.ingredients}
                            onChange={handleChange}
                            disabled={saving}
                        />
                    </div>
                    <div className={styles.modalField}>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            className={styles.input}
                            value={form.imageUrl}
                            onChange={handleChange}
                            disabled={saving}
                        />
                        {form.imageUrl && (
                            <img
                                src={form.imageUrl}
                                alt="Preview"
                                className={styles.previewImg}
                                onError={handleImgError}
                                style={{ marginTop: 8, maxHeight: 80, borderRadius: 8 }}
                            />
                        )}
                    </div>
                    <div className={styles.modalFieldCheckboxes}>
                        <label>
                            <input
                                type="checkbox"
                                name="vegetarian"
                                checked={form.vegetarian}
                                onChange={handleChange}
                                disabled={saving}
                            />
                            Vegetarian
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="spicy"
                                checked={form.spicy}
                                onChange={handleChange}
                                disabled={saving}
                            />
                            Spicy
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="popular"
                                checked={form.popular}
                                onChange={handleChange}
                                disabled={saving}
                            />
                            Popular
                        </label>
                    </div>
                    {generalError && (
                        <div className={styles.generalError}>{generalError}</div>
                    )}
                    <div className={styles.modalFooter}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.saveButton}
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

AdminItemModel.propTypes = {
    item: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AdminItemModel;
