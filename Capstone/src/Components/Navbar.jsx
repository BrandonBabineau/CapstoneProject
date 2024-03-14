import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar(props) {
  const navigate = useNavigate();

  const logoutUser = () => {
    props.setToken(null);
    navigate("/");
  };

  return (
    <div>
      <nav className="nav">
        <input id="menu" type="checkbox" />
        <label htmlFor="menu">Menu</label>
        <ul className="menu">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/inventory">Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Shopping Cart</NavLink>
          </li>
          {props.token ? (
            <li>
              <button onClick={logoutUser}>Logout</button>
            </li>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
