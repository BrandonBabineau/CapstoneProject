import { useState, useEffect } from 'react';

const AccountDetails = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const apiEndpoint = 'https://fakestoreapi.com/auth/login';

    if (token) {
      fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setIsLoggedIn(true);
      })
      .catch(error => console.error('Error fetching account details:', error));
    }
  }, [token]);

  return (
    <div>
      {isLoggedIn ? (
        userData ? (
          <div>
            <h2>Account Details</h2>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
          </div>
        ) : (
          <p>Loading account details...</p>
        )
      ) : (
        <p>Please log in or create an account to view your details.</p>
      )}
    </div>
  );
};

export default AccountDetails;
