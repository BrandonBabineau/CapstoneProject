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
    // alert message for successful checkout
    window.alert('Checkout successful!');
    // redirect to the inventory page
    window.location.href = '/inventory';
  };

  return (
    <div>
      <h1>Cart</h1>
      <button onClick={handleRemoveSelected} disabled={selectedProducts.length === 0}>Remove Selected</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}> {}
        {cartProducts.map(product => (
          <li key={product.id}>
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleCheckboxChange(product.id)}
            />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <img src={product.image} alt={product.title} />

            <p>
              Quantity: 
              <input
  type="number"
  value={product.quantity || 0}
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
