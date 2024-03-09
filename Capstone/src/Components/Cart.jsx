import React from 'react';
import { useCartQuery } from "../redux/api";

function ShoppingCart() {
  const userId = 1; 

  const { data: cart, error, isLoading } = useCartQuery(userId);

  return (
    <div>
      <h1>Cart</h1>
      {isLoading && <p>Loading cart...</p>}
      {error && <p>Error fetching cart: {error.message}</p>}
      {cart && (
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
      )}
    </div>
  );
}

export default ShoppingCart;
