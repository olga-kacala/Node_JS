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
  const status = 'initiaziled';
  const turn = 0;
  const userHealth = 100;
  const opponentHealth = 100;
  const query = "INSERT INTO games (gameId, status, side, turn, userHealth, opponentHealth) VALUES (?, ?, ?, ?, ?, ?)";
  db.run(query, [gameId, status, side, turn, userHealth, opponentHealth], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Game creation failed", error: err });
    }
    res.json({ gameId, status });
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

app.post("/api/v1/attack", (req, res) => {
  const { gameId } = req.body;
  if (!gameId) {
    return res.status(400).json({ message: "Game ID is required" });
  }
  const query = "SELECT * FROM games WHERE gameId = ?";
  db.get(query, [gameId], (err, game) => {
    if (err || !game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Check if the game is already finished
    if (game.userHealth <= 0 || game.opponentHealth <= 0) {
      return res.status(400).json({ message: "The game is already finished" });
    }

    const userAttackPower = Math.floor(Math.random() * (20 - 10 + 1)) + 10; // Random power between 10-20
    const newOpponentHealth = Math.max(game.opponentHealth - userAttackPower, 0); // User attack

// Determine the game status after user attack
let gameStatus = "ongoing";
if (newOpponentHealth <= 0) {
  gameStatus = "won";
  
}

    const opponentAttackPower = Math.floor(Math.random() * (20 - 10 + 1)) + 10; // Random power between 10-20
    const newUserHealth = Math.max(game.userHealth - opponentAttackPower, 0); // Simulating opponent's attack

    // Increment turn
    const newTurn = game.turn + 1;

    // Determine the game status after opponent attack
   if (newUserHealth <= 0) {
      gameStatus = "lost";
   }

    db.run(
      "UPDATE games SET userHealth = ?, opponentHealth = ?, status = ?, turn = ? WHERE gameId = ?",
      [newUserHealth, newOpponentHealth, gameStatus, newTurn, gameId],
      function (err) {
        if (err) {
          console.error("Error updating game health:", err);
          return res.status(500).json({ message: "Error updating game health", error: err.message });
        }
        res.json({
          message: "Attack successful",
          userHealth: newUserHealth,
          opponentHealth: newOpponentHealth,
          turn: newTurn,
          gameStatus: gameStatus,
        });
      }
    );
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

// Serve React App
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});
