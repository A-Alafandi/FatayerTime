import React, { useEffect, useState } from 'react';
import styles from '././MenuPage.module.css'; // Use global CSS or module if available
import Spinner from '../spinner/Spinner';
import MenuSection from './MenuSection';
import ItemDetailsModal from './ItemDetailsModal';

function MenuPage() {
    const [menu, setMenu] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    // API base URL - adjust this to match your backend
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    // Function to fetch menu data without authentication
    const getMenuData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/menu`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Network error' }));
                throw new Error(error.message || `HTTP ${response.status}`);
            }

            const data = await response.json();
            return data || [];
        } catch (error) {
            console.error('Failed to fetch menu data:', error);
            throw error;
        }
    };

    // Fetch menu items
    useEffect(() => {
        let active = true;

        async function fetchMenu() {
            setIsLoading(true);
            setError('');

            try {
                const data = await getMenuData();
                if (active) {
                    setMenu(data || []);
                }
            } catch (err) {
                if (active) {
                    console.error('Failed to fetch menu:', err);
                    setError('Failed to load menu. Please try again later.');
                }
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        }

        fetchMenu();

        return () => {
            active = false;
        };
    }, []);

    // List unique categories
    const categories = React.useMemo(() => {
        const cats = Array.from(new Set(menu.map(item => item.category).filter(Boolean)));
        return cats.length ? cats : ['Other'];
    }, [menu]);

    return (
        <section id="menu" className={styles.menuSection || 'menu-section'} aria-labelledby="menu-title">
            <div className={styles.menuHeroBanner || 'menu-hero-banner'}>
                <div className={styles.menuBannerOverlay || 'menu-banner-overlay'}>
                    <h2 id="menu-title" className={styles.menuBannerTitle || 'menu-banner-title'}>
                        Menu
                    </h2>
                    <p>Discover our delicious selection of Fatayers and more!</p>
                </div>
            </div>

            <div className={styles.menuContainer || 'menu-container'}>
                {isLoading && (
                    <div className={styles.menuLoading || 'menu-loading'}>
                        <Spinner size="large" />
                    </div>
                )}
                {error && (
                    <div className={styles.menuError || 'menu-error'}>{error}</div>
                )}
                {!isLoading && !error && menu.length === 0 && (
                    <div className={styles.menuEmpty || 'menu-empty'}>No menu items found.</div>
                )}
                {!isLoading && !error && menu.length > 0 && (
                    <div className={styles.menuSections || 'menu-sections'}>
                        {categories.map(cat => (
                            <MenuSection
                                key={cat}
                                category={cat}
                                items={menu.filter(item => item.category === cat)}
                                onItemClick={setSelectedItem}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Item Details Modal */}
            {selectedItem && (
                <ItemDetailsModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </section>
    );
}

export default MenuPage;