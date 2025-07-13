// src/components/AdminDashboard/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';
import AdminNavbar from './AdminNavbar';
import MenuCard from '../Menu/MenuCard';
import Spinner from '../spinner/Spinner';
import Notification from '../Notification';
import Confirmation from '../Confirmation';

function AdminDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch menu items (replace with your real API call)
  useEffect(() => {
    setLoading(true);
    // Simulate fetch
    setTimeout(() => {
      setMenuItems([
        { id: 1, name: "Spinach Fatayer", category: "Vegetarian", price: 3.5, description: "Delicious spinach pie." },
        { id: 2, name: "Cheese Fatayer", category: "Vegetarian", price: 3.0, description: "Classic cheese pie." },
        // Add more demo items...
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Filtered items by search
  const filtered = menuItems.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle delete with confirmation dialog
  const handleDelete = id => {
    setItemToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setMenuItems(items => items.filter(i => i.id !== itemToDelete));
    setNotification({ message: "Item deleted.", type: "success" });
    setConfirmOpen(false);
    setItemToDelete(null);
  };

  return (
      <div className={styles.dashboard}>
        <AdminNavbar />

        <main className={styles.main}>
          <div className={styles.headerRow}>
            <h2 className={styles.title}>Admin Dashboard</h2>
            <button
                className={styles.addButton}
                onClick={() => setNotification({ message: "Add item clicked!", type: "info" })}
            >
              + Add Item
            </button>
          </div>
          <div className={styles.searchRow}>
            <input
                type="search"
                className={styles.searchInput}
                placeholder="Search items..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search menu items"
            />
          </div>

          {loading ? (
              <div className={styles.center}>
                <Spinner />
              </div>
          ) : (
              <div className={styles.cardsGrid}>
                {filtered.length === 0 ? (
                    <div className={styles.empty}>No items found.</div>
                ) : (
                    filtered.map(item => (
                        <div key={item.id} className={styles.cardWrapper}>
                          <MenuCard item={item} onClick={() => {}} />
                          <button
                              className={styles.deleteButton}
                              onClick={() => handleDelete(item.id)}
                              aria-label={`Delete ${item.name}`}
                          >
                            🗑
                          </button>
                        </div>
                    ))
                )}
              </div>
          )}

          {notification && (
              <Notification
                  message={notification.message}
                  type={notification.type}
                  duration={2000}
                  onClose={() => setNotification(null)}
              />
          )}
          <Confirmation
              open={confirmOpen}
              title="Delete menu item?"
              message="Are you sure you want to delete this item? This action cannot be undone."
              confirmText="Delete"
              cancelText="Cancel"
              onConfirm={confirmDelete}
              onCancel={() => setConfirmOpen(false)}
          />
        </main>
      </div>
  );
}

export default AdminDashboard;
