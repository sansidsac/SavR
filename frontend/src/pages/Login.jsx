import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    axios.get('http://localhost:5173')
      .then(response => {
        setIsAuthenticated(response.data === 'Logged in');
      })
      .catch(error => {
        console.error('There was an error checking the authentication status!', error);
      });
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5173/login';
  };

  const handleLogout = () => {
    window.location.href = 'http://localhost:5173/logout';
  };

  const fetchProfile = () => {
    axios.get('http://localhost:5173/profile')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the profile!', error);
      });
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome! You are logged in.</h2>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={fetchProfile}>Fetch Profile</button>
          {profile && (
            <div>
              <h3>User Profile</h3>
              <pre>{JSON.stringify(profile, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Please log in.</h2>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;