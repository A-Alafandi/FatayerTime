import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import './MenuPage.css';

function MenuCard({ item, onClick }) {
  return (
      <div className="col-md-4 mb-4">
        <div className="card h-100 menu-card shadow-sm" onClick={onClick}>
          <img
              src={item.imageUrl}
              alt={item.name}
              className="card-img-top menu-card-img"
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">€ {item.price?.toFixed(2) ?? 'N/A'}</p>
          </div>
        </div>
      </div>
  );
}

function MenuModal({ item, onClose }) {
  if (!item) return null;

  return (
      <div className="menu-modal" onClick={onClose}>
        <div className="menu-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>×</button>
          <img src={item.imageUrl} alt={item.name} className="modal-img" />
          <h3>{item.name}</h3>
          <p><strong>Prijs:</strong> € {item.price?.toFixed(2)}</p>
          <p><strong>Ingrediënten:</strong> {item.ingredients}</p>
          <p><strong>Beschrijving:</strong> {item.description}</p>
        </div>
      </div>
  );
}

function MenuSection({ title, emoji, items, category, onItemClick }) {
  const filtered = items.filter(item => item.category?.toLowerCase() === category);
  if (filtered.length === 0) return null;

  return (
      <>
        <h2 className="mt-5 border-bottom pb-2">{emoji} {title}</h2>
        <div className="row">
          {filtered.map(item => (
              <MenuCard key={item.id} item={item} onClick={() => onItemClick(item)} />
          ))}
        </div>
      </>
  );
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('http://localhost:8080/api/menu');
        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      }
    }

    fetchMenu();
  }, []);

  return (
      <>
        <div className="menu-hero-banner">
          <div className="menu-banner-overlay">
            <h2 className="menu-banner-title">Bekijk ons heerlijke Menu</h2>
          </div>
        </div>
        <main className="container my-3 pt-3">
          <MenuSection
              title="Fatayer"
              emoji="🥟"
              items={menuItems}
              category="fatayer"
              onItemClick={setSelectedItem}
          />

          <MenuSection
              title="Drinks"
              emoji="🥤"
              items={menuItems}
              category="drinks"
              onItemClick={setSelectedItem}
          />
        </main>
        <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        <Footer />
      </>
  );
}
