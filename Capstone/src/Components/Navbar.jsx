import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Registration</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
  
        {isLoggedIn && (
          <>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
         <Link to="/inventory">Inventory</Link>
        </li>
        <li>
         <Link to="/cart">Shopping Cart</Link>
        </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
