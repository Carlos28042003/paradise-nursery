import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

export default function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400", description: "Produces pristine oxygen overnight.", cost: 15 },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400", description: "Filters airborne toxins efficiently.", cost: 12 },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=400", description: "Removes mold spores from the air.", cost: 18 },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1512428813824-f713c2410a71?w=400", description: "Natural humidifier for living areas.", cost: 14 },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400", description: "Cleans air while offering soothing gel.", cost: 10 },
        { name: "English Ivy", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400", description: "Excellent at reducing airborne dust particles.", cost: 16 }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632203171982-cc0df6e9ceb4?w=400", description: "Thrives on neglect and dark rooms.", cost: 22 },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400", description: "Virtually indestructible foliage build.", cost: 25 },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400", description: "Fast-growing vine that handles drought well.", cost: 12 },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400", description: "Beautiful succulent that requires rare watering.", cost: 15 },
        { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1632203171982-cc0df6e9ceb4?w=400", description: "Tolerates poor lighting and dry air smoothly.", cost: 19 },
        { name: "Succulent Trio", image: "https://images.unsplash.com/photo-1512428813824-f713c2410a71?w=400", description: "Small, compact desert setup for desks.", cost: 14 }
      ]
    },
    {
      category: "Aromatic & Culinary",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=400", description: "Calming floral aromatherapy profiles.", cost: 20 },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515585657470-30476a7c36a6?w=400", description: "Fresh savory herb perfect for cooking.", cost: 12 },
        { name: "Peppermint", image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400", description: "Invigorating clean aroma essence.", cost: 10 },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=400", description: "Citrus scent profile that repels pests.", cost: 14 },
        { name: "Sweet Basil", image: "https://images.unsplash.com/photo-1512428813824-f713c2410a71?w=400", description: "Essential kitchen window plant.", cost: 8 },
        { name: "Thyme", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400", description: "Hardy ground cover rich in earthy aromas.", cost: 11 }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  if (showCart) {
    return <CartItem onContinueShopping={() => setShowCart(false)} />;
  }

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand" onClick={() => window.location.reload()}>Paradise Nursery</div>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <div className="cart-icon-container" onClick={() => setShowCart(true)}>
            <svg className="cart-svg" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <span className="cart-count-badge">{totalCartItems}</span>
          </div>
        </div>
      </nav>

      <div className="product-grid-container">
        {plantsArray.map((cat, idx) => (
          <div key={idx} className="category-section">
            <h2 className="category-title">{cat.category}</h2>
            <div className="plants-list">
              {cat.plants.map((plant, pIdx) => (
                <div key={pIdx} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="plant-img" />
                  <h3>{plant.name}</h3>
                  <p className="plant-desc">{plant.description}</p>
                  <p className="plant-cost">${plant.cost}</p>
                  <button 
                    className={`add-to-cart-btn ${isPlantInCart(plant.name) ? 'disabled' : ''}`}
                    disabled={isPlantInCart(plant.name)}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {isPlantInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}