import React, { useState } from 'react';
import Inventory from './Inventory'; // Import your Inventory component

const LoginForm = () => {
  const [showInventory, setShowInventory] = useState(false); // State to control showing inventory
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming no actual authentication needed, set showInventory to true directly
    setShowInventory(true);
  };

  // If showInventory is true, render Inventory component
  if (showInventory) {
    return <Inventory />;
  }

  return (
    <div>
      <h2>Login</h2>
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
    </div>
  );
};

export default LoginForm;
