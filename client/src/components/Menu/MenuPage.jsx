import React, { useEffect, useState, useMemo, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Main.css';
import Spinner from '../spinner/Spinner';
import MenuSection from './MenuSection';
import ItemDetailsModal from './ItemDetailsModal';
import MenuNavbar from './MenuNavbar';
import MenuHero from './MenuHero';
import Footer from "../Footer";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

function MenuPage() {
    const [menu, setMenu] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [isRetrying, setIsRetrying] = useState(false);

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    // Validate API URL
    if (!API_BASE_URL.startsWith('http')) {
        console.error('Invalid API URL configuration');
    }

    // Sleep function for retry delay
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Enhanced fetch with retry logic
    const getMenuData = useCallback(async (attemptNumber = 0) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/menu`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Network error' }));
                throw new Error(error.message || `HTTP ${response.status}`);
            }

            const data = await response.json();
            return data || [];
        } catch (error) {
            console.error(`Menu fetch attempt ${attemptNumber + 1} failed:`, error);

            // If this isn't the last attempt, retry after delay
            if (attemptNumber < MAX_RETRIES - 1) {
                await sleep(RETRY_DELAY * (attemptNumber + 1)); // Exponential backoff
                return getMenuData(attemptNumber + 1);
            }

            // If all retries failed, throw the error
            throw error;
        }
    }, [API_BASE_URL]);

    // Manual retry function
    const handleRetry = useCallback(async () => {
        if (retryCount >= MAX_RETRIES) return;

        setIsRetrying(true);
        setError('');
        setRetryCount(prev => prev + 1);

        try {
            const data = await getMenuData();
            setMenu(data || []);
            setRetryCount(0); // Reset retry count on success
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsRetrying(false);
        }
    }, [getMenuData, retryCount]);

    // Get user-friendly error message
    const getErrorMessage = (error) => {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            return 'Network error. Please check your connection and try again.';
        }
        return error.message || 'Failed to load menu. Please try again later.';
    };

    useEffect(() => {
        let active = true;

        async function fetchMenu() {
            setIsLoading(true);
            setError('');
            setRetryCount(0);

            try {
                const data = await getMenuData();
                if (active) {
                    setMenu(data || []);
                }
            } catch (err) {
                if (active) {
                    setError(getErrorMessage(err));
                }
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        }

        fetchMenu();
        return () => { active = false; };
    }, [getMenuData]);

    // --- Grouping logic: Fatayer at top, Drinks at bottom, others in between ---
    const groupedCategories = useMemo(() => {
        const FATAYER = ['Fatayer'];
        const DRINKS = ['Drinks', 'Drink'];
        let fatayerItems = [], drinksItems = [], otherCategories = {};

        menu.forEach(item => {
            if (!item.category) return;
            const cat = item.category.trim().toLowerCase();
            if (FATAYER.map(c => c.toLowerCase()).includes(cat)) {
                fatayerItems.push(item);
            } else if (DRINKS.map(c => c.toLowerCase()).includes(cat)) {
                drinksItems.push(item);
            } else {
                if (!otherCategories[item.category]) otherCategories[item.category] = [];
                otherCategories[item.category].push(item);
            }
        });
        return {
            fatayerItems,
            otherCategories,
            drinksItems
        };
    }, [menu]);

    // Enhanced error display with retry functionality
    const renderError = () => (
        <div className="alert alert-danger text-center">
            <div className="mb-2">{error}</div>
            {retryCount < MAX_RETRIES && (
                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleRetry}
                    disabled={isRetrying}
                >
                    {isRetrying ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Retrying...
                        </>
                    ) : (
                        `Retry (${retryCount}/${MAX_RETRIES})`
                    )}
                </button>
            )}
            {retryCount >= MAX_RETRIES && (
                <div className="mt-2 text-muted">
                    Maximum retry attempts reached. Please refresh the page or try again later.
                </div>
            )}
        </div>
    );

    return (
        <>
            <MenuNavbar />
            <MenuHero />
            <section id="menu" className="menu section py-5" aria-labelledby="menu-title">
                <div className="container">
                    {isLoading && (
                        <div className="menu-loading">
                            <Spinner size="large" />
                            <div className="mt-3 text-center text-muted">Loading menu...</div>
                        </div>
                    )}

                    {error && renderError()}

                    {!isLoading && !error && menu.length === 0 && (
                        <div className="alert alert-warning text-center">
                            No menu items found. Please check back later.
                        </div>
                    )}

                    {!isLoading && !error && menu.length > 0 && (
                        <div>
                            {/* Fatayer at the top */}
                            {groupedCategories.fatayerItems.length > 0 && (
                                <MenuSection
                                    key="Fatayer"
                                    category="Fatayer"
                                    items={groupedCategories.fatayerItems}
                                    onItemClick={setSelectedItem}
                                />
                            )}
                            {/* Other categories */}
                            {Object.entries(groupedCategories.otherCategories).map(([cat, items]) =>
                                <MenuSection
                                    key={cat}
                                    category={cat}
                                    items={items}
                                    onItemClick={setSelectedItem}
                                />
                            )}
                            {/* Drinks at the bottom */}
                            {groupedCategories.drinksItems.length > 0 && (
                                <MenuSection
                                    key="Drinks"
                                    category="Drinks"
                                    items={groupedCategories.drinksItems}
                                    onItemClick={setSelectedItem}
                                />
                            )}
                        </div>
                    )}
                </div>
                {/* Item details modal (overlay) */}
                {selectedItem && (
                    <ItemDetailsModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </section>
            <Footer />
        </>
    );
}

export default MenuPage;