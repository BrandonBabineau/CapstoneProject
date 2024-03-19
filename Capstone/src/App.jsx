import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProductDetail from './Components/singleProductInventory'; // Import ProductDetail component
import Home from './Components/Home';
import LoginForm from './Components/Login';
import Inventory from './Components/Inventory';
import ShoppingCart from './Components/Cart';
import NavBar from './Components/Navbar';
import './Components/CSS/navbar.css'

function App() {
  const [token, setToken] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

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
    setCartProducts(prevCartProducts =>
      prevCartProducts.filter(product => !selectedProducts.includes(product.id))
    );
  };

  const updateQuantity = (productId, quantity) => {
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
          <NavBar token={token} setToken={setToken} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm setToken={setToken} />} />
            <Route path="/inventory" element={<Inventory addToCart={addToCart} />} />
            {}
            <Route path="/product/:productId" element={<ProductDetail />} />
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