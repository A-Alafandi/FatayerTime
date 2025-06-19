import { Routes, Route } from 'react-router-dom'
import HeaderHero from './components/HeaderHero'
import SimpleHeader from './components/SimpleHeader'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MenuPage from './components/MenuPage'
import OpeningHours from './components/OpeningHours'
import MapSection from './components/MapSection'
import AdminDashboard from './components/AdminDashboard'

function App() {
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
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
