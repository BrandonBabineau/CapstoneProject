import React, { useState } from 'react';
import './CSS/cart.css';

function ShoppingCart({ cartProducts, removeSelectedFromCart, updateQuantity }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [updatedQuantity, setUpdatedQuantity] = useState({});

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleRemoveSelected = () => {
    removeSelectedFromCart(selectedProducts);
    setSelectedProducts([]);
  };

  const handleQuantityChange = (productId, quantity) => {
    setUpdatedQuantity({ ...updatedQuantity, [productId]: quantity });
    updateQuantity(productId, quantity);
  };

  const handleUpdateQuantity = () => {
    // Update quantities for products
    Object.keys(updatedQuantity).forEach(productId => {
      updateQuantity(productId, updatedQuantity[productId]);
    });
    // Clear the updated quantity state
    setUpdatedQuantity({});
  };

  const handleCheckout = () => {
    // Remove all products from the cart
    removeSelectedFromCart(cartProducts.map(product => product.id));
    setSelectedProducts([]);
    // alert message for checkout
    window.alert('Checkout successful!');
    // redirect to the inventory page
  };

  // Calculate total price
  const totalPrice = cartProducts ? cartProducts.reduce((acc, product) => acc + (product.price * (updatedQuantity[product.id] || product.quantity || 1)), 0) : 0;

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <button onClick={handleRemoveSelected} disabled={selectedProducts.length === 0}>Remove Selected</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {cartProducts.map(product => (
          <li key={product.id} className="product-card">
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleCheckboxChange(product.id)}
            />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p> {}
            <img src={product.image} alt={product.title} />
            <p>
              Quantity:
              <input
                type="number"
                value={updatedQuantity[product.id] || product.quantity || 1}
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
              />
            </p>
          </li>
        ))}
      </ul>
      <div className="total-price-box">
        <p style={{ color: 'black' }}>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
      <div>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
