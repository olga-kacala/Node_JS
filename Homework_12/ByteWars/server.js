const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// In-memory game storage for simplicity
let games = [{
    status:'hello'
}];

// Endpoint: Start Game
app.post('/api/v1/start-game', (req, res) => {
  const { side } = req.body;
  const gameId = `game-${games.length + 1}`;
  const game = { gameId, status: 'initialized', side, units: [], turn: 'human' };
  games.push(game);
  res.json({ gameId, status: 'initialized' });
});

// Endpoint: Get Game Status
app.get('/api/v1/game-status', (req, res) => {
  const game = games[0]; // Fetch the first game in the array for testing
  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
});

// Endpoint: Add Unit
app.post('/api/v1/add-unit', (req, res) => {
  const { gameId, unitType, position } = req.body;
  const game = games.find(g => g.gameId === gameId);
  if (game) {
    const unitId = `unit-${game.units.length + 1}`;
    const unit = { unitId, unitType, position };
    game.units.push(unit);
    res.json(game);
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
});

// Endpoint: Make Move
app.post('/api/v1/make-move', (req, res) => {
  const { gameId, unitId, move } = req.body;
  const game = games.find(g => g.gameId === gameId);
  if (game) {
    const unit = game.units.find(u => u.unitId === unitId);
    if (unit) {
      unit.position = move;
      res.json(game);
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
});

// Endpoint: Attack
app.post('/api/v1/attack', (req, res) => {
  const { gameId, attackingUnitId, targetUnitId } = req.body;
  const game = games.find(g => g.gameId === gameId);
  if (game) {
    const attackingUnit = game.units.find(u => u.unitId === attackingUnitId);
    const targetUnit = game.units.find(u => u.unitId === targetUnitId);
    if (attackingUnit && targetUnit) {
      // Simplified attack logic
      targetUnit.health = (targetUnit.health || 100) - 10;
      const result = {
        message: 'Attack successful',
        attackingUnit,
        targetUnit
      };
      res.json(result);
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
});

// Endpoint: Get Battle Results
app.get('/api/v1/battle-results', (req, res) => {
  const { gameId } = req.query;
  const game = games.find(g => g.gameId === gameId);
  if (game) {
    res.json({ gameId, results: game.units });
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
});

// Serve React App
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Go to -> http://localhost:${PORT} and fight for your life!`);
});
