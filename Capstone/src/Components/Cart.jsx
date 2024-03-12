import React, { useState } from 'react';

function ShoppingCart({ cartProducts, removeSelectedFromCart }) {
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

  return (
    <div>
      <h1>Cart</h1>
      <button onClick={handleRemoveSelected} disabled={selectedProducts.length === 0}>Remove Selected</button>
      <ul>
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
            <p>Quantity: {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
