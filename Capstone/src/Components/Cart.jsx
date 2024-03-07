import React, { useState, useEffect } from 'react';
import Inventory from './Inventory'

function ShoppingCart() {
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(2); // 

  useEffect(() => {
    const fetchCartByUserId = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartByUserId();
  }, [userId]); 

  return (
    <div>
      <h1>Cart</h1>
      {cart ? (
        <div>
          <h3>{cart.id}</h3>
          <p>{cart.userId}</p>
          <p>{cart.date}</p>
          {cart.products && cart.products.length > 0 ? ( 
            <div>
              <h4>Products:</h4>
              <ul>
                {cart.products.map(product => (
                  <li key={product.productId}>
                    <p>Product ID: {product.productId}, Quantity: {product.quantity}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No products in the cart.</p>
          )}
        </div>
      ) : (
        <p>Loading cart...</p>
      )}
    </div>
  );
}

export default ShoppingCart;
