import React, { useEffect, useState } from 'react'
import SimpleHeader from './SimpleHeader'
import Footer from './Footer'
import './MenuPage.css'

function MenuPage() {
  const [menuItems, setMenuItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: 'Fatayer Spinazie',
        price: 3.5,
        image:
          'https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1',
        ingredients: 'Spinazie, ui, olijfolie, zout',
        description: 'Een heerlijke hartige pastei gevuld met verse spinazie.',
      },
      {
        id: 2,
        name: 'Fatayer Kaas',
        price: 4.0,
        image:
          'https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1',
        ingredients: 'Witte kaas, peterselie, deeg',
        description: 'Romige kaasfatayer met een zachte textuur.',
      },
      {
        id: 3,
        name: 'Fatayer Vlees',
        price: 4.5,
        image:
          'https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1',
        ingredients: 'Rundergehakt, ui, kruiden',
        description: 'Traditionele vleesfatayer met sappige vulling.',
      },
      {
        id: 4,
        name: 'Fatayer Spinazie',
        price: 3.5,
        image:
          'https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1',
        ingredients: 'Spinazie, ui, olijfolie, zout',
        description: 'Een heerlijke hartige pastei gevuld met verse spinazie.',
      },
      {
        id: 5,
        name: 'Fatayer Kaas',
        price: 4.0,
        image:
          'https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1',
        ingredients: 'Witte kaas, peterselie, deeg',
        description: 'Romige kaasfatayer met een zachte textuur.',
      },
      {
        id: 6,
        name: 'Fatayer Vlees',
        price: 4.5,
        image:
          'https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1',
        ingredients: 'Rundergehakt, ui, kruiden',
        description: 'Traditionele vleesfatayer met sappige vulling.',
      },
      {
        id: 7,
        name: 'Fatayer Groenten',
        price: 3.8,
        image:
          'https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1',
        ingredients: 'Gemengde groenten, kruiden, deeg',
        description: 'Gezonde groentefatayer met een knapperige korst.',
      },
      {
        id: 8,
        name: 'Fatayer Kip',
        price: 4.2,
        image:
          'https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1',
        ingredients: 'Kipfilet, specerijen, ui',
        description: 'Kruidige kipfatayer met sappige kipvulling.',
      },
      {
        id: 9,
        name: 'Fatayer Zoet',
        price: 3.0,
        image:
          'https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1',
        ingredients: 'Suiker, kaneel, deeg',
        description: 'Zoete fatayer met een vleugje kaneel.',
      },
      {
        id: 10,
        name: 'Fatayer Mix',
        price: 5.0,
        image:
          'https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1',
        ingredients: 'Mix van vlees, kaas en groenten',
        description: 'Een combinatie van onze populairste fatayer.',
      },
      {
        id: 11,
        name: 'Fatayer Special',
        price: 6.0,
        image:
          'https://i0.wp.com/baitiana.com/wp-content/uploads/2025/02/IMG_1343.jpeg?resize=846%2C1024&ssl=1',
        ingredients: 'Speciale vulling van de chef-kok',
        description: 'Een unieke fatayer met een geheime vulling.',
      },
    ]
    setMenuItems(mockData)
  }, [])

  return (
    <>
      <SimpleHeader />

      <div className="menu-hero-banner">
        <div className="menu-banner-overlay">
          <h2 className="menu-banner-title">
            Bekijk ons heerlijke assortiment
          </h2>
        </div>
      </div>

      <main className="container my-5 pt-5">
        <h1 className="text-center mb-4">Ons Menu</h1>
        <div className="row">
          {menuItems.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div
                className="card h-100 menu-card shadow-sm"
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top menu-card-img"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">€ {item.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedItem && (
        <div className="menu-modal" onClick={() => setSelectedItem(null)}>
          <div
            className="menu-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setSelectedItem(null)}>
              ×
            </button>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="modal-img"
            />
            <h3>{selectedItem.name}</h3>
            <p>
              <strong>Prijs:</strong> € {selectedItem.price.toFixed(2)}
            </p>
            <p>
              <strong>Ingrediënten:</strong> {selectedItem.ingredients}
            </p>
            <p>
              <strong>Beschrijving:</strong> {selectedItem.description}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default MenuPage
