import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main.css';

function NotFound() {
    return (
        <main className="container text-center py-5" aria-label="Page not found">
            <div className="py-5">
                <h1 className="display-1 fw-bold text-danger mb-0">404</h1>
                <h2 className="mb-3" style={{ color: '#37373f', fontWeight: 700 }}>
                    Page Not Found
                </h2>
                <p className="mb-4 text-muted">
                    Oops! The page you’re looking for doesn’t exist or has been moved.<br />
                    Try going back to the <Link to="/" className="text-danger fw-semibold">home page</Link>.
                </p>
                <Link to="/" className="btn btn-primary px-5 py-2 mt-3">
                    Go Home
                </Link>
            </div>
        </main>
    );
}

export default React.memo(NotFound);
