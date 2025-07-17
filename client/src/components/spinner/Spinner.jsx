import React from 'react';
import "../../Main.css"

function Spinner({ size = 'md', variant = 'primary', label = 'Loading…' }) {
    const sizePx = size === 'lg' ? 60 : size === 'sm' ? 24 : 38;
    const variantClass = {
        primary: '',
        secondary: '',
        danger: '',
        gray: '',
    }[variant] || '';

    return (
        <span className={`spinner${variantClass ? ' ' + variantClass : ''}`} role="status" aria-live="polite">
      <svg
          className="spinnerSvg"
          width={sizePx}
          height={sizePx}
          viewBox="0 0 38 38"
          fill="none"
      >
        <circle
            className="spinnerCircle"
            cx="19"
            cy="19"
            r="16"
            strokeWidth="4"
            fill="none"
        />
      </svg>
      <span className="srOnly">{label}</span>
    </span>
    );
}

export default Spinner;
