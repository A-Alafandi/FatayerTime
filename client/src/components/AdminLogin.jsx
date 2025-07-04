import React, { useState } from 'react'
import { login } from '../utils/auth' // adjust path if needed

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      await login(username, password) // sets cookies automatically

      if (typeof onLogin === 'function') {
        onLogin()
      } else {
        window.location.href = '/admin' // or '/admin/dashboard'
      }
    } catch (err) {
      console.error('Login failed:', err)
      alert('Wrong username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="container my-5">
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 400 }}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
                id="username"
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
  )
}

export default AdminLogin
