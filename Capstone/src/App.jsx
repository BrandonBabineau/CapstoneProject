import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store";

import Home from './Components/Home';
import LoginForm from './Components/Login';
import Inventory from './Components/Inventory';
import ShoppingCart from './Components/Cart';
import NavBar from "./Components/Navbar";

function App() {
  const [token, setToken] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  // Load cart data from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cartProducts');
    if (savedCart) {
      setCartProducts(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addToCart = (selectedProducts) => {
    setCartProducts(prevCartProducts => [...prevCartProducts, ...selectedProducts]);
  };

  const removeSelectedFromCart = (selectedProducts) => {
    // Implement the logic to remove selected products from the cart
    setCartProducts(prevCartProducts =>
      prevCartProducts.filter(product => !selectedProducts.includes(product.id))
    );
  };

  const updateQuantity = (productId, quantity) => {
    // Implement the logic to update the quantity of a product in the cart
    setCartProducts(prevCartProducts =>
      prevCartProducts.map(product =>
        product.id === productId ? { ...product, quantity: quantity } : product
      )
    );
  };

  return (
    <div>
      <Provider store={store}>
        <Router>
          <NavBar token={token} setToken={setToken} /> {/* Pass token and setToken as props */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm setToken={setToken} />} /> {/* Pass setToken to LoginForm */}
            <Route path="/inventory" element={<Inventory addToCart={addToCart} />} />
            <Route
              path="/cart"
              element={
                <ShoppingCart
                  cartProducts={cartProducts}
                  removeSelectedFromCart={removeSelectedFromCart}
                  updateQuantity={updateQuantity}
                />
              }
            />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
