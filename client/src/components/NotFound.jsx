import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Sorry, this page does not exist.</p>
            <Link to="/">Go Home</Link>
        </div>
    );
}
