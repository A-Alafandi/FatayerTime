import React from 'react'
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="py-4 bg-dark text-white text-center">
      <div className="container">
        <div className="copyright">
          <p className="mb-0">Ook een website nodig? Wij helpen je graag!</p>
          <h3 className="mb-0">Alafandi Consaltency</h3>
        </div>
        <a href="/admin" className="admin-link">
          Admin
        </a>
      </div>
    </footer>
  )
}

export default Footer
