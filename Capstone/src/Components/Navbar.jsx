import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar(props) {
  const navigate = useNavigate();

  const logoutUser = () => {
    props.setToken(null);
    navigate("/");
  };

  if (props.token) {
    return (
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Apply inline style to remove bullets */}
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/inventory">Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Shopping Cart</NavLink>
          </li>
          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Apply inline style to remove bullets */}
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/inventory">Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Shopping Cart</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
