import React, { useState, useEffect } from 'react';

const LoginForm = () => {
  const loggedInState = localStorage.getItem('loggedIn') === 'true';

  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(loggedInState); 

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
        console.log(data); 
        setLoggedIn(true); 
        localStorage.setItem('loggedIn', 'true'); 
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
    localStorage.removeItem('loggedIn'); 
    setLoggedIn(false);
    // Show alert when user logs out
    alert('You have been logged out.');
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (loggedIn) {
        // Show alert when user logs out
        event.preventDefault();
        event.returnValue = ''; 
        alert('You have been logged out.');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [loggedIn]);

  return (
    <div>
      <h2>{loggedIn ? 'Welcome!' : 'Login'}</h2>
      {loggedIn && <button onClick={handleLogout}>Logout</button>} {/* Render logout button if user is logged in */}
      {!loggedIn && ( // Render the login form only if user is not logged in
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
    </div>
  );
};

export default LoginForm;
