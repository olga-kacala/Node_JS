import React, { useState } from 'react';
import './App.css';
import { NewGame } from './components/NewGame';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch('/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      handleLogin();
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Byte Wars: AI vs Humans</h1>
        {isLoggedIn ? (
          <>
          <div>Hello, {username}</div>
            <button onClick={handleLogout}>Logout</button>
            
            <NewGame/>
          </>
        ) : (
          <form>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={handleLogin}>Login</button>
            <button type="button" onClick={handleRegistration}>
              Register
            </button>
          </form>
        )}
      </header>
    </div>
  );
}

export default App;