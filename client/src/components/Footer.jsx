import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main.css';

function Footer() {
    return (
        <footer id="footer" className="footer dark-background py-4 mt-5" role="contentinfo">
            <div className="container">
                <div className="row gy-3">
                    {/* ... other footer sections remain the same ... */}

                    <div className="col-lg-3 col-md-6">
                        <h4>Follow Us</h4>
                        <div className="social-links d-flex mb-2">
                            <a href="https://wa.me/31685108263" target="_blank" rel="noopener noreferrer" className="me-2">
                                <i className="bi bi-whatsapp fs-4 text-success"></i>
                            </a>
                            <button className="social-button me-2" aria-label="Facebook">
                                <i className="bi bi-facebook fs-4 text-primary"></i>
                            </button>
                            <button className="social-button me-2" aria-label="Instagram">
                                <i className="bi bi-instagram fs-4 text-danger"></i>
                            </button>
                            <button className="social-button me-2" aria-label="LinkedIn">
                                <i className="bi bi-linkedin fs-4 text-info"></i>
                            </button>
                        </div>
                        <p>
                            <a
                                href="https://wa.me/31685108263"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="brandLink"
                                aria-label="Contact AfandiLabs via WhatsApp"
                            >
                                <span className="brand">Ook een website nodig? Wij helpen je graag!</span>
                            </a>
                        </p>
                    </div>
                </div>

                <div className="text-center mt-4 small text-light">
                    <p className="mb-1">© <span>Copyright</span> <strong className="sitename px-1">Fatayer Time</strong> <span>All Rights Reserved</span></p>
                    <div className="credits mb-1">
                        Website by <a href="https://afandilabs.nl" className="link-light">AfandiLabs</a>
                    </div>
                    <button
                        onClick={() => window.location.href = '/admin-login'}
                        className="adminLink text-decoration-underline link-light bg-transparent border-0"
                        aria-label="Admin dashboard login"
                    >
                        Admin
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default React.memo(Footer);