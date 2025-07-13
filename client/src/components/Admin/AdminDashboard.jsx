import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { api } from '../../utils/auth'
import AdminNavbar from './AdminNavbar';
import AdminItemModel from './AdminItemModel';
import Notification from '../Notification';
import Spinner from '../spinner/Spinner';
import Confirmation from '../Confirmation';
import styles from './AdminDashboard.module.css';
import { debounce } from 'lodash';

// @ts-check

/**
 * @typedef {Object} MenuItem
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} imageUrl
 * @property {string} ingredients
 * @property {string} category
 * @property {boolean} vegetarian
 * @property {string} [id]
 */

/**
 * @typedef {Object} AdminDashboardState
 * @property {MenuItem[]} menuItems
 * @property {boolean} loading
 * @property {string|null} error
 * @property {string} searchTerm
 * @property {MenuItem|null} selectedItem
 * @property {boolean} isCreating
 * @property {string|null} confirmDelete
 */

/** @type {MenuItem} */
const DEFAULT_MENU_ITEM = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  ingredients: '',
  category: '',
  vegetarian: false,
};

const AdminDashboard = () => {
  /** @type {[AdminDashboardState, Function]} */
  const [state, setState] = useState({
    menuItems: [],
    loading: true,
    error: null,
    searchTerm: '',
    selectedItem: null,
    isCreating: false,
    confirmDelete: null,
  });

  const fetchMenu = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const res = await api.get('/admin/menu');
      if (!Array.isArray(res)) {
        throw new Error('Invalid response format from server');
      }
      setState(prev => ({ ...prev, menuItems: res, loading: false }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load menu items. Please try again later.',
      }));
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const handleSaveItem = useCallback(
      async (formData) => {
        try {
          if (formData.id) {
            await api.put(`/admin/menu/${formData.id}`, formData);
          } else {
            await api.post('/admin/menu', formData);
          }
          fetchMenu();
          setState(prev => ({
            ...prev,
            selectedItem: null,
            isCreating: false,
            error: null,
          }));
        } catch (err) {
          setState(prev => ({
            ...prev,
            error: formData.id ? 'Failed to update item' : 'Failed to create item',
          }));
        }
      },
      [fetchMenu]
  );

  const handleDelete = useCallback(
      async (id) => {
        try {
          await api.delete(`/admin/menu/${id}`);
          setState(prev => ({
            ...prev,
            menuItems: prev.menuItems.filter(item => item.id !== id),
            confirmDelete: null,
            error: null,
          }));
        } catch (err) {
          setState(prev => ({ ...prev, error: 'Failed to delete item' }));
        }
      },
      []
  );

  const debouncedSearch = useMemo(
      () =>
          debounce((term) => {
            setState(prev => ({ ...prev, searchTerm: term }));
          }, 300),
      []
  );

  const filteredItems = useMemo(() => {
    const term = state.searchTerm.toLowerCase();
    return state.menuItems.filter(
        item =>
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term)
    );
  }, [state.menuItems, state.searchTerm]);

  return (
      <div className={styles.adminDashboard}>
        <AdminNavbar />
        {state.error && (
            <Notification
                message={state.error}
                type="error"
                onClose={() => setState(prev => ({ ...prev, error: null }))}
            />
        )}
        <div className={styles.dashboardHeader}>
          <h1>Menu Management</h1>
          <div className={styles.controls}>
            <div className={styles.searchControl}>
              <input
                  type="text"
                  placeholder="🔍 Search items..."
                  onChange={(e) => debouncedSearch(e.target.value)}
                  aria-label="Search menu items"
              />
            </div>
            <button
                className={styles.addButton}
                onClick={() =>
                    setState(prev => ({
                      ...prev,
                      selectedItem: DEFAULT_MENU_ITEM,
                      isCreating: true,
                    }))
                }
                aria-label="Add new menu item"
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add New Item
            </button>
          </div>
        </div>
        {state.loading ? (
            <div className={styles.loadingState}>
              <Spinner size="large" />
              <p>Loading menu items...</p>
            </div>
        ) : filteredItems.length === 0 ? (
            <div className={styles.emptyState}>
              {state.searchTerm ? (
                  <p>No items match your search criteria</p>
              ) : (
                  <>
                    <p>No menu items found</p>
                    <button
                        className={styles.addButton}
                        onClick={() =>
                            setState(prev => ({
                              ...prev,
                              selectedItem: DEFAULT_MENU_ITEM,
                              isCreating: true,
                            }))
                        }
                        aria-label="Add first menu item"
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Add Your First Item
                    </button>
                  </>
              )}
            </div>
        ) : (
            <div className={styles.menuItemsList}>
              <div className={styles.listHeader}>
                <div>Item Name</div>
                <div>Category</div>
                <div>Price</div>
                <div>Actions</div>
              </div>
              {filteredItems.map(item => (
                  <div key={item.id} className={styles.menuItem}>
                    <div className={styles.itemMain}>
                      <div className={styles.itemName}>
                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className={styles.itemThumbnail}
                                onError={(e) => (e.target.src = '/images/fallback-food.jpg')}
                            />
                        )}
                        <div>
                          <h3>{item.name}</h3>
                          <p className={styles.itemDescription}>{item.description}</p>
                        </div>
                      </div>
                      <div className={styles.itemCategory}>{item.category}</div>
                      <div className={styles.itemPrice}>€{item.price.toFixed(2)}</div>
                    </div>
                    <div className={styles.itemActions}>
                      <button
                          className={styles.editButton}
                          onClick={() =>
                              setState(prev => ({ ...prev, selectedItem: item }))
                          }
                          aria-label={`Edit ${item.name}`}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                          className={styles.deleteButton}
                          onClick={() =>
                              setState(prev => ({ ...prev, confirmDelete: item.id }))
                          }
                          aria-label={`Delete ${item.name}`}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        )}
        {(state.selectedItem || state.isCreating) && (
            <AdminItemModel
                item={state.selectedItem}
                onSave={handleSaveItem}
                onClose={() =>
                    setState(prev => ({
                      ...prev,
                      selectedItem: null,
                      isCreating: false,
                    }))
                }
            />
        )}
        {state.confirmDelete && (
            <Confirmation
                title="Confirm Deletion"
                message="Are you sure you want to delete this menu item? This action cannot be undone."
                confirmText="Delete"
                onConfirm={() => handleDelete(state.confirmDelete)}
                onCancel={() => setState(prev => ({ ...prev, confirmDelete: null }))}
            />
        )}
      </div>
  );
};

export default AdminDashboard;