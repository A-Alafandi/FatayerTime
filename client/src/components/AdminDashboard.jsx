import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminDashboard.css'

function AdminDashboard() {
  const [menuItems, setMenuItems] = useState([])
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    image: '',
    ingredients: '',
    description: '',
  })

  useEffect(() => {
    fetchMenu()
  }, [])

  const getAuthConfig = () => {
    const token = localStorage.getItem('token')
    return {
      headers: { Authorization: `Bearer ${token}` },
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/admin' // or redirect to login screen
  }
  const fetchMenu = async () => {
    try {
      const res = await axios.get(
        'https://fatayer-time-backend.onrender.com/api/menu',
        getAuthConfig()
      )
      setMenuItems(res.data)
    } catch (err) {
      console.error('Error fetching menu items:', err)
    }
  }

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value })
  }

  const handleAddItem = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        'https://fatayer-time-backend.onrender.com/api/menu',
        newItem,
        getAuthConfig()
      )
      setNewItem({
        name: '',
        price: '',
        image: '',
        ingredients: '',
        description: '',
      })
      fetchMenu()
    } catch (err) {
      console.error('Error adding menu item:', err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://fatayer-time-backend.onrender.com/api/menu/${id}`,
        getAuthConfig()
      )
      fetchMenu()
    } catch (err) {
      console.error('Error deleting item:', err)
    }
  }

  return (
    <div className="admin-dashboard container mt-5">
      <h2 className="mb-4">Admin Dashboard - Menu Management</h2>

      <form className="mb-4" onSubmit={handleAddItem}>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              step="0.01"
              className="form-control"
              placeholder="Price"
              name="price"
              value={newItem.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Image URL"
              name="image"
              value={newItem.image}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Ingredients"
              name="ingredients"
              value={newItem.ingredients}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              name="description"
              value={newItem.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Menu Item
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>€ {item.price.toFixed(2)}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  width="80"
                  height="60"
                  style={{ objectFit: 'cover' }}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="mb-4">
        Admin Dashboard - Menu Management
        <button className="logout-btn mb-4" onClick={handleLogout}>
          Logout
        </button>
      </h2>
    </div>
  )
}

export default AdminDashboard
