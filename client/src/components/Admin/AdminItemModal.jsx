import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../styles/AdminPanel.css";

const AdminItemModal = ({ show, onClose, onSave, selectedItem, saving, deleteItem }) => {
    const [form, setForm] = useState({
        name: "",
        category: "Fatayer",
        description: "",
        price: "",
        imageUrl: "",
        vegetarian: false,
        spicy: false,
        ingredients: [""],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedItem) {
            setForm({
                name: selectedItem.name || "",
                category: selectedItem.category || "Fatayer",
                description: selectedItem.description || "",
                price: selectedItem.price || "",
                imageUrl: selectedItem.imageUrl || "",
                vegetarian: !!selectedItem.isVegetarian,
                spicy: !!selectedItem.isSpicy,
                ingredients: selectedItem.ingredients?.length ? selectedItem.ingredients : [""],
            });
        } else {
            setForm({
                name: "",
                category: "Fatayer",
                description: "",
                price: "",
                imageUrl: "",
                vegetarian: false,
                spicy: false,
                ingredients: [""],
            });
        }
        setErrors({});
    }, [selectedItem]);

    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        if (name === "ingredient") {
            const newIngredients = [...form.ingredients];
            newIngredients[index] = value;
            setForm({ ...form, ingredients: newIngredients });
        } else {
            setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        }
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const addIngredient = () => {
        setForm(prev => ({ ...prev, ingredients: [...prev.ingredients, ""] }));
    };

    const removeIngredient = (index) => {
        const newIngredients = form.ingredients.filter((_, i) => i !== index);
        setForm(prev => ({ ...prev, ingredients: newIngredients }));
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.description.trim()) errs.description = "Description is required";
        if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
            errs.price = "Valid price is required";
        if (!form.imageUrl.trim()) errs.imageUrl = "Image URL is required";

        // Validate ingredients
        const emptyIngredients = form.ingredients.filter(ing => !ing.trim()).length;
        if (emptyIngredients === form.ingredients.length) {
            errs.ingredients = "At least one ingredient is required";
        }

        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        onSave({
            ...form,
            price: Number(form.price),
            isVegetarian: form.vegetarian,
            isSpicy: form.spicy,
            ingredients: form.ingredients.filter(i => i.trim() !== ""),
        });
    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className="admin-modal"
            overlayClassName="admin-modal-backdrop"
        >
            <div className="admin-modal-title">{selectedItem ? "Edit Item" : "Add Item"}</div>
            <form onSubmit={handleSubmit} className="admin-modal-form">
                <div className="admin-modal-field">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`admin-input ${errors.name ? "input-error" : ""}`}
                    />
                    {errors.name && <div className="admin-field-error">{errors.name}</div>}
                </div>

                <div className="admin-modal-field">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="admin-input"
                    >
                        <option value="Fatayer">Fatayer</option>
                        <option value="Drink">Drink</option>
                    </select>
                </div>

                <div className="admin-modal-field">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className={`admin-textarea ${errors.description ? "input-error" : ""}`}
                    />
                    {errors.description && <div className="admin-field-error">{errors.description}</div>}
                </div>

                <div className="admin-modal-field">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="price"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className={`admin-input ${errors.price ? "input-error" : ""}`}
                    />
                    {errors.price && <div className="admin-field-error">{errors.price}</div>}
                </div>

                <div className="admin-modal-field">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        className={`admin-input ${errors.imageUrl ? "input-error" : ""}`}
                    />
                    {errors.imageUrl && <div className="admin-field-error">{errors.imageUrl}</div>}
                    {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="admin-preview-img" />}
                </div>

                <div className="admin-modal-field ingredients-field-group">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className="ingredients-label">Ingredients:</label>
                    <div className="ingredients-container">
                        {form.ingredients.map((ing, idx) => (
                            <div key={idx} className="ingredient-field">
                                <input
                                    id={`ingredient-${idx}`}
                                    name="ingredient"
                                    value={ing}
                                    onChange={(e) => handleChange(e, idx)}
                                    placeholder={`Ingredient ${idx + 1}`}
                                    className="admin-input"
                                />
                                {form.ingredients.length > 1 && (
                                    <button
                                        type="button"
                                        className="admin-remove-ingredient-btn"
                                        onClick={() => removeIngredient(idx)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {errors.ingredients && <div className="admin-field-error">{errors.ingredients}</div>}
                    <button
                        type="button"
                        className="admin-add-ingredient-btn"
                        onClick={addIngredient}
                    >
                        Add Ingredient
                    </button>
                </div>

                <div className="admin-modal-field-checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            name="vegetarian"
                            checked={form.vegetarian}
                            onChange={handleChange}
                        />
                        Vegetarian
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="spicy"
                            checked={form.spicy}
                            onChange={handleChange}
                        />
                        Spicy
                    </label>
                </div>

                <div className="admin-modal-footer">
                    <button type="button" className="admin-cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="admin-save-btn" disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AdminItemModal;