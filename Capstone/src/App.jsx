import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import './App.css'
import Home from './Components/Home'; 
import LoginForm from './Components/Login';
import AccountDetails from './Components/Account';
import RegistrationForm from './Components/Register'; 
import NavBar from "./Components/Navbar";


function App () {

  return (
    <Router>
      <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/account" element={<AccountDetails />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;