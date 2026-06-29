import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

export default function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  const handleCheckout = () => {
    alert('Checkout functionality is coming soon!');
  };

  return (
    <div className="cart-view-container">
      <nav className="navbar">
        <div className="nav-brand" onClick={onContinueShopping}>Paradise Nursery</div>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onContinueShopping(); }}>Continue Shopping</a>
        </div>
      </nav>

      <div className="cart-content">
        <h2>Your Shopping Cart</h2>
        <div className="cart-meta-summary">
          <p>Total Plants in Cart: <strong>{calculateTotalItems()}</strong></p>
          <h3 className="grand-total">Total Cart Amount: ${calculateTotalAmount()}</h3>
        </div>

        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is currently empty.</p>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="unit-cost">Unit Price: ${item.cost}</p>
                  <p className="item-subtotal">Subtotal: ${item.cost * item.quantity}</p>
                  
                  <div className="qty-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  
                  <button className="delete-btn" onClick={() => handleRemove(item.name)}>
                    Remove Item
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-actions">
          <button className="continue-btn" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}