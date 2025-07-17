import React, { useState, useEffect } from 'react';

function ScrollTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 200);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return visible ? (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
                position: 'fixed', bottom: 30, right: 30, zIndex: 1050,
                borderRadius: '50%', background: '#ce1212', color: '#fff',
                border: 'none', width: 48, height: 48, fontSize: 24,
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
            }}
            aria-label="Scroll to top"
        >↑</button>
    ) : null;
}

export default ScrollTopButton;
