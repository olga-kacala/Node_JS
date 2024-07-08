const sqlite3 = require('sqlite3').verbose();
const path = require('path');


// Resolve the path to the database file
const dbPath = path.resolve(__dirname, 'byte-wars.db');

// Open a connection to the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables if they don't exist: users, games, and units. 
// db.serialize: This method ensures that the following SQL commands are executed in sequence
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS games (
    gameId TEXT PRIMARY KEY,
    status TEXT,
    side TEXT,
    turn TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS units (
    unitId TEXT PRIMARY KEY,
    gameId TEXT,
    unitType TEXT,
    position TEXT,
    health INTEGER DEFAULT 100,
    FOREIGN KEY (gameId) REFERENCES games(gameId)
  )`);
});

module.exports = db;
