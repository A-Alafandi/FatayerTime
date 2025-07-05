// src/components/MenuPage.jsx
import React, { useEffect, useState } from 'react';
import Footer        from './Footer';
import SimpleHeader  from './SimpleHeader';
import './MenuPage.css';               // ← keep your existing styles

/* ————————————————————————————————————  small reusable bits  —————————————————— */
function MenuCard({ item, onClick }) {
    return (
        <div className="col-sm-6 col-lg-4 mb-4">
            <div className="card h-100 menu-card shadow-sm" onClick={onClick}>
                <img src={item.imageUrl}
                     alt={item.name}
                     className="card-img-top menu-card-img" />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">€ {Number(item.price).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

function MenuModal({ item, onClose }) {
    if (!item) return null;
    return (
        <div className="menu-modal" onClick={onClose}>
            <div className="menu-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <img src={item.imageUrl} alt={item.name} className="modal-img" />
                <h3 className="modal-title">{item.name}</h3>
                <p className="modal-price">€ {Number(item.price).toFixed(2)}</p>

                {item.ingredients && <>
                    <p className="modal-label">Ingrediënten</p>
                    <p className="modal-desc">{item.ingredients}</p>
                </>}

                {item.description && <>
                    <p className="modal-label">Beschrijving</p>
                    <p className="modal-desc">{item.description}</p>
                </>}
            </div>
        </div>
    );
}

function MenuSection({ title, emoji, items, category, onItemClick }) {
    const filtered = items.filter(
        i => i.category?.toLowerCase() === category.toLowerCase()
    );

    if (filtered.length === 0) return null;

    return (
        <>
            <h2 className="menu-section-title">
                <span role="img" aria-label={title}>{emoji}</span> {title}
            </h2>
            <div className="row">
                {filtered.map(item => (
                    <MenuCard key={item.id} item={item} onClick={() => onItemClick(item)} />
                ))}
            </div>
        </>
    );
}

/* ————————————————————————————————————  main page  ————————————————————— */
export default function MenuPage() {
    const [menuItems,   setMenuItems]   = useState([]);
    const [selected,    setSelected]    = useState(null);
    const [loading,     setLoading]     = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch('http://localhost:8080/api/menu');
                const data = await resp.json();
                setMenuItems(data);
            } catch (err) {
                console.error('Failed to fetch menu', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="page-container">
            {/* fixed header */}
            <SimpleHeader />

            {/* hero banner */}
            <div className="menu-hero-banner">
                <div className="menu-banner-overlay">
                    <h2 className="menu-banner-title">Bekijk ons heerlijke Menu</h2>
                </div>
            </div>

            {/* actual content */}
            <main className="container page-content py-4">
                {loading && (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status" />
                    </div>
                )}

                {!loading && (
                    <>
                        <MenuSection
                            title="Fatayer"
                            emoji="🥟"
                            category="fatayer"
                            items={menuItems}
                            onItemClick={setSelected}
                        />

                        <MenuSection
                            title="Drinks"
                            emoji="🥤"
                            category="drinks"
                            items={menuItems}
                            onItemClick={setSelected}
                        />

                        {/* Show a friendly message if nothing is returned */}
                        {menuItems.length === 0 && (
                            <p className="text-center text-muted my-5">
                                Helaas… ons menu is momenteel leeg.
                            </p>
                        )}
                    </>
                )}
            </main>

            {/* sticky-footer */}
            <Footer />

            {/* details modal */}
            <MenuModal item={selected} onClose={() => setSelected(null)} />
        </div>
    );
}
