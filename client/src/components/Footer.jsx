function Footer() {
  return (
      <footer className="py-4 bg-dark text-white text-center">
        <div className="container">
          <p className="mb-0">Ook een website nodig? Wij helpen je graag!</p>

          <h4 className="mb-2">
            <a
                href="https://wa.me/31685108263"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none"
                style={{ fontWeight: 'bold' }}
            >
              AfandiLabs
            </a>
          </h4>
          <a href="/admin" className="admin-link small">
            Admin
          </a>
        </div>
      </footer>
  );
}

export default Footer;