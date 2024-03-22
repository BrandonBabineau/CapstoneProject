import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = (props) => {
  const loggedInState = localStorage.getItem('loggedIn') === 'true';

  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(loggedInState); 
  const navigate = useNavigate(); 

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

        props.setToken(data.token); // setting prop

        setLoggedIn(true); 
        localStorage.setItem('loggedIn', 'true'); 
        navigate("/inventory"); // Navigate to inventory page
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
      <h2>{loggedIn ? '' : 'Login'}</h2>
      <img className="main" src="https://media.istockphoto.com/id/1294996142/photo/front-view-of-mock-up-laptop-computer-with-blank-screen-notebook-stationery-coffee-cup-and.jpg?s=2048x2048&w=is&k=20&c=BTnM4S7QDLodSstkAfzOUNLwaBJKVLab7qj9CiTmk7k=" />

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
