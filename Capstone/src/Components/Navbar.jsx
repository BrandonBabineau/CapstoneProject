import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar(props) {
  const navigate = useNavigate();

  const logoutUser = () => {
    props.setToken(null);
    navigate("/");
  };
console.log (props.token, props); 

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
            {props.token && <NavLink  to="/cart">Shopping Cart</NavLink>}
          </li>
          <li>
              <NavLink onClick={logoutUser} to="/login">{props.token ? "Logout": "Login"}</NavLink>
            </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
