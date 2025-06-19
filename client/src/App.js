import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HeaderHero from './components/HeaderHero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MenuPage from './components/MenuPage'
import OpeningHours from './components/OpeningHours'
import MapSection from './components/MapSection'
import SimpleHeader from './components/SimpleHeader'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
    navigate('/admin')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <HeaderHero showHero={true} showButtons={true} />
            <About />
            <Services />
            <MapSection />
            <OpeningHours />
            <Contact />
            <Footer />
          </>
        }
      />
      <Route
        path="/menu"
        element={
          <>
            <SimpleHeader />
            <MenuPage />
          </>
        }
      />
      <Route
        path="/admin"
        element={
          isLoggedIn ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <Navigate to="/admin-login" />
          )
        }
      />
      <Route
        path="/admin-login"
        element={<AdminLogin onLogin={handleLogin} />}
      />
    </Routes>
  )
}

export default App
