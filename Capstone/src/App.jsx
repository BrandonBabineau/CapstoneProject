import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router
import { Provider } from "react-redux";
import store from "./redux/store"

import Home from './Components/Home';
import LoginForm from './Components/Login';
import Inventory from './Components/Inventory';
import ShoppingCart from './Components/Cart';
import NavBar from "./Components/Navbar";

function App() {
  const [token, setToken] = useState(null);
  return (
    <div>
      <Provider store={store}>
      <Router> {/* Use Router here */}
        <NavBar token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/inventory" element={<Inventory setToken={setToken} />} />
          <Route path="/cart" element={<ShoppingCart setToken={setToken} />} />
        </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
