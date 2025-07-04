import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, getAccessToken } from '../utils/auth';
import SimpleHeader from './SimpleHeader';
import './AdminDashboard.css';
import {findAllByDisplayValue} from "@testing-library/dom";
import Footer from "./Footer";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [profile, setProfile] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doLogout = () => navigate('/admin-login');

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await api.get('/menu');
      setMenu(res.data);
    } catch (err) {
      console.error(err);
      setError('Not authorized. Please log in again.');
      doLogout();
    } finally {
      setLoading(false);
    }
  };

  const saveItem = async (item) => {
    const endpoint = item.id ? `/menu/${item.id}` : '/menu';
    const method = item.id ? api.put : api.post;
    await method(endpoint, item);
    fetchMenu();
  };

  const deleteItem = async (id) => {
    if (window.confirm('Delete this item?')) {
      await api.delete(`/menu/${id}`);
      fetchMenu();
    }
  };

  const updateProfile = async () => {
    await api.put('/admin/update', profile);
    alert('Profile updated – please log in again.');
    doLogout();
  };

  useEffect(() => {
    if (!getAccessToken()) {
      navigate('/admin-login');
    } else {
      fetchMenu();
    }
  }, []);

  const filteredItems = menu.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const ItemModal = () => {
    const [draft, setDraft] = useState(
        editingItem ?? {
          name: '',
          price: '',
          imageUrl: '',
          ingredients: '',
          description: '',
          category: ''
        }
    );

    const handleChange = (e) => {
      const { name, value } = e.target;
      setDraft(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await saveItem(draft);
        setModalOpen(false);
      } catch (err) {
        alert('Save failed');
      }
    };

    return (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h4>{draft.id ? 'Edit item' : 'New item'}</h4>
            <form onSubmit={handleSubmit}>
              {['name', 'price', 'imageUrl', 'ingredients', 'category'].map((f) => (
                  <input
                      key={f}
                      className="form-control mb-2"
                      name={f}
                      placeholder={f}
                      value={draft[f]}
                      onChange={handleChange}
                      required={f === 'name' || f === 'price'}
                  />
              ))}
              <textarea
                  className="form-control mb-3"
                  name="description"
                  placeholder="Description"
                  value={draft.description}
                  onChange={handleChange}
              />
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {draft.id ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
    );
  };

  const AccountModal = () => (
      <div className="modal-backdrop" onClick={() => setShowAccount(false)}>
        <div className="modal-card" onClick={e => e.stopPropagation()}>
          <h4>Update Profile</h4>
          <form
              className="border rounded p-3"
              onSubmit={(e) => {
                e.preventDefault();
                updateProfile();
              }}
          >
            {[
              { name: 'currentPassword', type: 'password', placeholder: 'Current password *', required: true },
              { name: 'newUsername', type: 'text', placeholder: 'New Username *' },
              { name: 'newPassword', type: 'password', placeholder: 'New password *', required: true },
            ].map((f) => (
                <input
                    key={f.name}
                    {...f}
                    className="form-control mb-2"
                    value={profile[f.name] || ''}
                    onChange={(e) => setProfile({ ...profile, [f.name]: e.target.value })}
                />
            ))}
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAccount(false)}>Cancel</button>
              <button className="btn btn-warning">Save changes</button>
            </div>
          </form>
        </div>
      </div>
  );

  if (loading) {
    return (
        <div className="container text-center my-5">
          <SimpleHeader />
          <div className="spinner-border text-primary" />
        </div>
    );
  }

  if (error) return <p className="text-danger text-center my-5">{error}</p>;

  return (
      <>
        <div className="menu-hero-banner">
      </div>
        <div className="admin-dashboard container my-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">Admin Dashboard</h2>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowAccount(true)}>
                My Account
              </button>
              <button className="btn btn-outline-danger btn-sm" onClick={doLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="d-flex gap-3 mb-3">
            <input
                className="form-control"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                className="btn btn-primary"
                onClick={() => {
                  setEditingItem(null);
                  setModalOpen(true);
                }}
            >
              New
            </button>
          </div>

          <div className="table-responsive shadow-sm">
            <table className="table align-middle">
              <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>€</th>
                <th style={{ width: 140 }}>Image</th>
                <th>Description</th>
                <th className="text-end">Actions</th>
              </tr>
              </thead>
              <tbody>
              {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{(+item.price).toFixed(2)}</td>
                        <td>
                          {item.imageUrl && (
                              <img
                                  src={item.imageUrl}
                                  alt="thumb"
                                  className="img-thumbnail"
                                  style={{ maxWidth: 120 }}
                              />
                          )}
                        </td>
                        <td className="small">{item.description}</td>
                        <td className="text-end">
                          <button
                              className="btn btn-sm btn-outline-secondary me-2"
                              onClick={() => {
                                setEditingItem(item);
                                setModalOpen(true);
                              }}
                          >
                            Edit
                          </button>
                          <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteItem(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No items found</td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>

          {modalOpen && <ItemModal />}
          {showAccount && <AccountModal />}
        </div>
        <Footer />
      </>
  );
}
