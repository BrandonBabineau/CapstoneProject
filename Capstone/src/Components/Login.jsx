import React, { useState, useEffect } from 'react';
import Inventory from './Inventory'; // Import your Inventory component

const LoginForm = () => {
  // Check if the user is already logged in
  const loggedInState = localStorage.getItem('loggedIn') === 'true';

  // State variables
  const [showInventory, setShowInventory] = useState(loggedInState); // State to control showing inventory
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(loggedInState); // State to track whether user is logged in

  // Event handlers for input changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the response data
        setShowInventory(true); // Show inventory if login is successful
        setLoggedIn(true); // Set loggedIn state to true
        localStorage.setItem('loggedIn', 'true'); // Store loggedIn state in localStorage
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData); // Log error message
        setError(errorData.message); 
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('The username or password is incorrect. Please try again.'); // Set error state
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('loggedIn'); // Remove loggedIn state from localStorage
    setShowInventory(false);
    setLoggedIn(false);
  };

  return (
    <div>
      <h2>{loggedIn ? 'Welcome!' : 'Login'}</h2>
      {loggedIn && <button onClick={handleLogout}>Logout</button>} {/* Render logout button if user is logged in */}
      {!showInventory && !loggedIn && ( // Render the login form only if showInventory is false and user is not logged in
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      )}
      {showInventory && <Inventory />} {/* Render the Inventory component if showInventory is true */}
    </div>
  );
};

export default LoginForm;
