import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './Components/Home';
import LoginForm from './Components/Login';
import Account from './Components/Account';
import RegistrationForm from './Components/Register';
import Inventory from './Components/Inventory'
import ShoppingCart from './Components/Cart'
import NavBar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/account" element={<Account />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
