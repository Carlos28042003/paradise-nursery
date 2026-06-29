import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Greenery Meets Serenity</p>
            <button className="get-started-btn" onClick={() => setShowProductList(true)}>
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <p className="aboutus_text">
              Welcome to Paradise Nursery, where your dream of a vibrant, green oasis becomes reality. Our carefully selected houseplants are grown with precision and care to bring lasting fresh energy into your home or corporate spaces.
            </p>
          </div>
        </div>
      </div>
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        {showProductList && <ProductList />}
      </div>
    </div>
  );
}

export default App;