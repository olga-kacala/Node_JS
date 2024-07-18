const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("./db/database");
const jwt = require("./utils/jwt");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10;
const secret = "your-256-bit-secret";

app.use(cors());
app.use(bodyParser.json());

// Register User
app.post("/api/v1/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.run(query, [username, hashedPassword], function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "User registration failed", error: err });
      }
      res.json({
        message: "User registered successfully",
        userId: this.lastID,
      });
    });
  });
});

// Login User
app.post("/api/v1/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const query = "SELECT * FROM users WHERE username = ?";
  db.get(query, [username], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign({ userId: user.id }, secret);
      res.json({ token });
    });
  });
});

// Endpoint: Start Game
app.post("/api/v1/startGame", (req, res) => {
  const { side } = req.body;
  if (!side) {
    return res.status(400).json({ message: "Side is required" });
  }

  const gameId = `game-${Date.now()}`;
  const query = "INSERT INTO games (gameId, status, side) VALUES (?, ?, ?)";
  db.run(query, [gameId, "initialized", side], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Game creation failed", error: err });
    }
    res.json({ gameId, status: "initialized" });
  });
});

// Endpoint: Get Game Status
app.post("/api/v1/gameStatus", (req, res) => {
  const { gameId } = req.body;
  if (!gameId) {
    return res.status(400).json({ message: "Game ID is required" });
  }
  const query = "SELECT * FROM games WHERE gameId = ?";
  db.get(query, [gameId], (err, game) => {
    if (err || !game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  });
});

// Middleware to verify JWT
app.use("/api/v1", (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
});

//Endpoint: attack
app.post("/api/v1/attack", (req, res) => {
  const { gameId } = req.body;
  console.log("Attack endpoint hit with gameId:", gameId); // Log incoming request
  if (!gameId) {
    return res.status(400).json({ message: "Game ID is required" });
  }

  db.get("SELECT * FROM games WHERE gameId = ?", [gameId], (err, game) => {
    if (err) {
      console.error("Error fetching game:", err);
      return res.status(500).json({ message: "Error fetching game", error: err.message });
    }
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    console.log("Fetched game:", game); // Log fetched game

    const attackPower = Math.floor(Math.random() * (50 - 30 + 1)) + 30; // Random power between 30-50
    const newOpponentHealth = Math.max(game.opponentHealth - attackPower, 0);
    const newUserHealth = Math.max(game.userHealth - attackPower, 0); // Simulating opponent's attack

    db.run(
      "UPDATE games SET userHealth = ?, opponentHealth = ? WHERE gameId = ?",
      [newUserHealth, newOpponentHealth, gameId],
      function (err) {
        if (err) {
          console.error("Error updating game health:", err);
          return res.status(500).json({ message: "Error updating game health", error: err.message });
        }
        console.log("Updated game health:", this.changes); // Log update result

        res.json({
          message: "Attack successful",
          userHealth: newUserHealth,
          opponentHealth: newOpponentHealth,
        });
      }
    );
  });
});

// Endpoint: End Game
app.post("/api/v1/end-game", (req, res) => {
  const { gameId } = req.body;
  if (!gameId) {
    return res.status(400).json({ message: "gameId is required" });
  }

  const query = "UPDATE games SET status = ? WHERE gameId = ?";
  db.run(query, ["ended", gameId], function (err) {
    if (err || this.changes === 0) {
      return res
        .status(500)
        .json({ message: "Failed to end game", error: err });
    }
    res.json({ message: "Game ended successfully" });
  });
});

// Serve React App
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});
