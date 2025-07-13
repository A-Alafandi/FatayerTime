import React, { useEffect, useState } from 'react';
import { api } from '../auth.js';
import SimpleHeader from './SimpleHeader';
import Footer from './Footer';
import MenuSection from './MenuSection';
import ItemDetailsModal from './ItemDetailsModal';
import Notification from './Notification';
import './MenuPage.css';

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await api.get('/menu');
                setMenuItems(data);
            } catch (err) {
                setError('Failed to load menu. Please try again later.');
                console.error('Failed to fetch Menu:', err);
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
                {error && (
                    <Notification
                        message={error}
                        type="error"
                        onClose={() => setError(null)}
                        autoDismiss={5000}
                    />
                )}
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
            <ItemDetailsModal item={selected} onClose={() => setSelected(null)} />
        </div>
    );
}