const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./db/database');
const jwt = require('./utils/jwt');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10;
const secret = 'your-256-bit-secret';

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

// Middleware to verify JWT
app.use('/api/v1', (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const isValid = jwt.verify(token, secret);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
});

// Endpoint: Start Game
app.post('/api/v1/start-game', (req, res) => {
  const { side } = req.body;
  if (!side) {
    return res.status(400).json({ message: 'Side is required' });
  }

  const gameId = `game-${Date.now()}`;
  const query = 'INSERT INTO games (gameId, status, side, turn) VALUES (?, ?, ?, ?)';
  db.run(query, [gameId, 'initialized', side, 'human'], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Game creation failed', error: err });
    }
    res.json({ gameId, status: 'initialized' });
  });
});

// Endpoint: Get Game Status
app.get('/api/v1/game-status', (req, res) => {
  const { gameId } = req.query;
  const query = 'SELECT * FROM games WHERE gameId = ?';
  db.get(query, [gameId], (err, game) => {
    if (err || !game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  });
});

// Endpoint: Add Unit
app.post('/api/v1/add-unit', (req, res) => {
  const { gameId, unitType, position } = req.body;
  if (!gameId || !unitType || !position) {
    return res.status(400).json({ message: 'gameId, unitType, and position are required' });
  }

  const unitId = `unit-${Date.now()}`;
  const query = 'INSERT INTO units (gameId, unitId, unitType, position) VALUES (?, ?, ?, ?)';
  db.run(query, [gameId, unitId, unitType, position], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to add unit', error: err });
    }
    res.json({ unitId, unitType, position, health: 100 });
  });
});

// Endpoint: Make Move
app.post('/api/v1/make-move', (req, res) => {
  const { gameId, unitId, move } = req.body;
  if (!gameId || !unitId || !move) {
    return res.status(400).json({ message: 'gameId, unitId, and move are required' });
  }

  const query = 'UPDATE units SET position = ? WHERE gameId = ? AND unitId = ?';
  db.run(query, [move, gameId, unitId], function (err) {
    if (err || this.changes === 0) {
      return res.status(404).json({ message: 'Failed to move unit or unit not found', error: err });
    }
    res.json({ message: 'Move successful' });
  });
});

// Endpoint: Attack
app.post('/api/v1/attack', (req, res) => {
  const { gameId, attackingUnitId, targetUnitId } = req.body;
  if (!gameId || !attackingUnitId || !targetUnitId) {
    return res.status(400).json({ message: 'gameId, attackingUnitId, and targetUnitId are required' });
  }

  const query = 'SELECT * FROM units WHERE gameId = ? AND (unitId = ? OR unitId = ?)';
  db.all(query, [gameId, attackingUnitId, targetUnitId], (err, units) => {
    if (err || units.length < 2) {
      return res.status(404).json({ message: 'Units not found', error: err });
    }

    const targetUnit = units.find(u => u.unitId === targetUnitId);
    if (!targetUnit) {
      return res.status(404).json({ message: 'Target unit not found' });
    }

    const newHealth = targetUnit.health - 10;
    const updateQuery = 'UPDATE units SET health = ? WHERE unitId = ? AND gameId = ?';
    db.run(updateQuery, [newHealth, targetUnitId, gameId], function (err) {
      if (err || this.changes === 0) {
        return res.status(500).json({ message: 'Failed to update target unit health', error: err });
      }

      res.json({
        message: 'Attack successful',
        attackingUnit: units.find(u => u.unitId === attackingUnitId),
        targetUnit: { ...targetUnit, health: newHealth },
      });
    });
  });
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
