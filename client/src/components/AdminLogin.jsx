import React, { useState } from 'react'

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = btoa(`${username}:${password}`) // base64 encode
    // Try test request
    fetch('https://fatayer-time-backend.onrender.com/api/menu', {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          localStorage.setItem('authToken', token)
          onLogin()
        } else {
          alert('Invalid credentials')
        }
      })
      .catch(() => alert('Login error'))
  }

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control my-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
