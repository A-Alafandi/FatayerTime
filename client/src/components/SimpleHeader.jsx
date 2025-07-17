import React from 'react';

export default function SimpleHeader({ title, subtitle, children }) {
    return (
        <header className="hero py-5 text-center bg-light">
            <div className="container">
                <h1 className="display-4 fw-bold" style={{ fontFamily: "'Amatic SC', cursive", color: '#ce1212', fontWeight: 700, letterSpacing: 2 }}>
                    {title}
                </h1>
                {subtitle && <p className="lead text-muted mb-4">{subtitle}</p>}
                {children}
            </div>
        </header>
    );
}
