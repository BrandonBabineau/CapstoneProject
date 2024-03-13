import React, { useState } from 'react';

function ShoppingCart({ cartProducts, removeSelectedFromCart, updateQuantity }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

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
    updateQuantity(productId, quantity);
  };

  const handleCheckout = () => {
    // Alert message for successful checkout
    window.alert('Checkout successful!');
    // Redirect to the inventory page
    window.location.href = '/inventory';
  };

  return (
    <div>
      <h1>Cart</h1>
      <button onClick={handleRemoveSelected} disabled={selectedProducts.length === 0}>Remove Selected</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Apply inline style to remove bullets */}
        {cartProducts.map(product => (
          <li key={product.id}>
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleCheckboxChange(product.id)}
            />
            <h3>{product.title}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>
              Quantity: 
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
              />
            </p>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default ShoppingCart;
