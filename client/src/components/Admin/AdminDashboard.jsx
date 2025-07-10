import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { api } from '../../utils/auth';
import AdminNavbar from './AdminNavbar';
import AdminItemModel from '../Admin/AdminItemModel';
import Notification from '../Notification';
import Spinner from '../spinner/Spinner';
import ConfirmationModal from '../ConfirmationModal';
import './AdminDashboard.css';


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
 * @property {string=} id
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
      setState(prev => ({ ...prev, menuItems: res, loading: false }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load menu items. Please try again later.'
      }));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMenu();
    };
    fetchData();
  }, [fetchMenu]);

  const handleSaveItem = useCallback(async (formData) => {
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
        error: null
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: formData.id
            ? 'Failed to update item'
            : 'Failed to create item'
      }));
    }
  }, [fetchMenu]);

  const handleDelete = useCallback(async (id) => {
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
  }, []);

  const filteredItems = useMemo(() => {
    const term = state.searchTerm.toLowerCase();
    return state.menuItems.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
  }, [state.menuItems, state.searchTerm]);

  return (
      <div className="admin-dashboard">
        <AdminNavbar />

        {state.error && (
            <Notification
                message={state.error}
                type="error"
                onClose={() => setState(prev => ({ ...prev, error: null }))}
            />
        )}

        <div className="dashboard-header">
          <h1>Menu Management</h1>
          <div className="controls">
            <div className="search-control">
              <input
                  type="text"
                  placeholder="🔍 Search items..."
                  value={state.searchTerm}
                  onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
                  aria-label="Search menu items"
              />
            </div>
            <button
                className="add-button"
                onClick={() => setState(prev => ({
                  ...prev,
                  selectedItem: DEFAULT_MENU_ITEM,
                  isCreating: true
                }))}
            >
              + Add New Item
            </button>
          </div>
        </div>

        {state.loading ? (
            <div className="loading-state">
              <Spinner size="large" />
              <p>Loading menu items...</p>
            </div>
        ) : filteredItems.length === 0 ? (
            <div className="empty-state">
              {state.searchTerm ? (
                  <p>No items match your search criteria</p>
              ) : (
                  <>
                    <p>No menu items found</p>
                    <button
                        className="add-button"
                        onClick={() => setState(prev => ({
                          ...prev,
                          selectedItem: DEFAULT_MENU_ITEM,
                          isCreating: true
                        }))}
                    >
                      + Add Your First Item
                    </button>
                  </>
              )}
            </div>
        ) : (
            <div className="menu-items-list">
              <div className="list-header">
                <div className="header-name">Item Name</div>
                <div className="header-category">Category</div>
                <div className="header-price">Price</div>
                <div className="header-actions">Actions</div>
              </div>
              {filteredItems.map(item => (
                  <div key={item.id} className="menu-item">
                    <div className="item-main">
                      <div className="item-name">
                        {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.name} className="item-thumbnail" />
                        )}
                        <div>
                          <h3>{item.name}</h3>
                          <p className="item-description">{item.description}</p>
                        </div>
                      </div>
                      <div className="item-category">{item.category}</div>
                      <div className="item-price">€{item.price.toFixed(2)}</div>
                    </div>
                    <div className="item-actions">
                      <button
                          className="edit-button"
                          onClick={() => setState(prev => ({ ...prev, selectedItem: item }))}
                      >
                        Edit
                      </button>
                      <button
                          className="delete-button"
                          onClick={() => setState(prev => ({ ...prev, confirmDelete: item.id }))}
                      >
                        Delete
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
                onClose={() => setState(prev => ({
                  ...prev,
                  selectedItem: null,
                  isCreating: false
                }))}
            />
        )}

        {state.confirmDelete && (
            <ConfirmationModal
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