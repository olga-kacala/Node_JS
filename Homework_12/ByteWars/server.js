
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./db/database');
const jwt = require('./utils/jwt');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10;
const secret = 'your-256-bit-secret';

app.use(cors());
app.use(bodyParser.json());



// Register User
app.post('/api/v1/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, hashedPassword], function (err) {
      if (err) {
        return res.status(500).json({ message: 'User registration failed', error: err });
      }
      res.json({ message: 'User registered successfully', userId: this.lastID });
    });
  });
});

// Login User
app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [username], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ userId: user.id }, secret);
      res.json({ token });
    });
  });
});


// Endpoint: Start Game
app.post('/api/v1/startGame', (req, res) => {
  const { side } = req.body;
  if (!side) {
    return res.status(400).json({ message: 'Side is required' });
  }

  const gameId = `game-${Date.now()}`;
  const query = 'INSERT INTO games (gameId, status, side) VALUES (?, ?, ?)';
  db.run(query, [gameId, 'initialized', side], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Game creation failed', error: err });
    }
    res.json({ gameId, status: 'initialized' });
  });
});

// Endpoint: Get Game Status
app.post('/api/v1/gameStatus', (req, res) => {
  const { gameId } = req.body; 
  if (!gameId) {
    return res.status(400).json({ message: 'Game ID is required' });
  }
  const query = 'SELECT * FROM games WHERE gameId = ?';
  db.get(query, [gameId], (err, game) => {
    if (err || !game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  });
});


// Middleware to verify JWT
app.use('/api/v1', (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId; 
    next();
  });
});


// Endpoint: Attack
app.post('/api/v1/attack', async (req, res) => {
  const { gameId, attackingUnitId, targetUnitId } = req.body;
  if (!gameId || !attackingUnitId || !targetUnitId) {
    return res.status(400).json({ message: 'gameId, attackingUnitId, and targetUnitId are required' });
  }

  try {
    const [attacker, target] = await Promise.all([
      db.get('SELECT * FROM units WHERE gameId = ? AND unitId = ?', [gameId, attackingUnitId]),
      db.get('SELECT * FROM units WHERE gameId = ? AND unitId = ?', [gameId, targetUnitId])
    ]);

    if (!attacker || !target) {
      return res.status(404).json({ message: 'Units not found' });
    }

    const attackPower = Math.floor(Math.random() * (50 - 30 + 1)) + 30; // Random power between 30-50
    const newHealth = Math.max(target.health - attackPower, 0);

    await db.run('UPDATE units SET health = ? WHERE unitId = ? AND gameId = ?', [newHealth, targetUnitId, gameId]);

    res.json({
      message: 'Attack successful',
      attackingUnit: attacker,
      targetUnit: { ...target, health: newHealth }
    });
  } catch (error) {
    console.error('Error processing attack:', error);
    res.status(500).json({ message: 'Failed to process attack', error: error.message });
  }
});



// Endpoint: Get Battle Results
app.get('/api/v1/battle-results', (req, res) => {
  const { gameId } = req.query;
  const query = 'SELECT * FROM units WHERE gameId = ?';
  db.all(query, [gameId], (err, units) => {
    if (err || !units.length) {
      return res.status(404).json({ message: 'Game or units not found', error: err });
    }
    res.json({ gameId, results: units });
  });
});


// Endpoint: End Game
app.post('/api/v1/end-game', (req, res) => {
  const { gameId } = req.body;
  if (!gameId) {
    return res.status(400).json({ message: 'gameId is required' });
  }

  const query = 'UPDATE games SET status = ? WHERE gameId = ?';
  db.run(query, ['ended', gameId], function (err) {
    if (err || this.changes === 0) {
      return res.status(500).json({ message: 'Failed to end game', error: err });
    }
    res.json({ message: 'Game ended successfully' });
  });
});


// Serve React App
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});