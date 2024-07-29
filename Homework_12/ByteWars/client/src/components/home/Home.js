import React, { useState } from "react";
import { Header } from "../header/Header";
import classes from "./Home.module.css";
import { NewGame } from "./NewGame";

export function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const data = await response.json();
      console.log("Registration successful:", data);
      handleLogin();
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className={classes.App}>
      {isLoggedIn ? (
        <>
          <nav>
            <p>Hello, {username}!</p>
            <button onClick={handleLogout}>Logout</button>
          </nav>
          <NewGame />
        </>
      ) : (
        <>
        <h1>Welcome Player</h1>
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
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <div>
              <h4> Not a player yet? </h4>
              <button type="button" onClick={handleRegistration}>
                Register
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
