import React, { useEffect, useState } from 'react';
import { api } from '../../utils/auth';
import AdminItemModel from './AdminItemModel';
import AdminNavbar from './AdminNavbar';
import Notification from '../Notification';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get('/admin/menu');
      setMenuItems(res);
    } catch (err) {
      setError('Failed to load Menu items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/menu/${id}`);
      setMenuItems(menuItems.filter((item) => item.id !== id));
      setConfirmDelete(null);
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const filteredItems = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="admin-dashboard">
        <AdminNavbar />

        {error && <Notification message={error} onClose={() => setError(null)} />}

        <div className="search-actions">
          <input
              type="text"
              placeholder="🔍 Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
          />
          <button
              className="add-button-small"
              onClick={() => {
                setSelectedItem({
                  name: '',
                  description: '',
                  price: 0,
                  imageUrl: '',
                  ingredients: '',
                  category: '',
                  vegetarian: false,
                });
                setIsCreating(true);
              }}
          >
            Add new item
          </button>
        </div>

        {loading ? (
            <p>Loading...</p>
        ) : filteredItems.length === 0 ? (
            <p>No items found.</p>
        ) : (
            <div className="menu-items">
              {filteredItems.map((item) => (
                  <AdminItemModel
                      key={item.id}
                      item={item}
                      onEdit={(i) => setSelectedItem(i)}
                      onDelete={() => setConfirmDelete(item.id)}
                  />
              ))}
            </div>
        )}

        {(selectedItem || isCreating) && (
            <AdminItemModel
                item={selectedItem}
                onClose={() => {
                  setSelectedItem(null);
                  setIsCreating(false);
                  fetchMenu();
                }}
            />
        )}

        {confirmDelete && (
            <div className="modal-overlay">
              <div className="modal">
                <p>Are you sure you want to delete this item?</p>
                <div className="modal-buttons">
                  <button onClick={() => handleDelete(confirmDelete)}>Yes, delete</button>
                  <button onClick={() => setConfirmDelete(null)}>Cancel</button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}
