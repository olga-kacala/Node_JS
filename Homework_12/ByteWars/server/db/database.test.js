const db = require('./database'); // Adjust path as necessary

db.serialize(() => {
  // Check if tables exist
  db.each("SELECT name FROM sqlite_master WHERE type='table'", (err, row) => {
    if (err) {
      console.error("Error retrieving tables:", err);
    } else {
      console.log("Found table:", row.name);
    }
  });

  // Insert a test user
  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    ['testuser', 'testpassword'],
    (err) => {
      if (err) {
        console.error("Failed to insert user:", err);
      } else {
        console.log("Test user inserted successfully.");
      }
    }
  );

  // Insert a test game
  db.run(
    "INSERT INTO games (gameId, status, side, turn, userHealth, opponentHealth, attackHP, totalAttack) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      `game-${Date.now()}`,
      'initialized',
      'human',
      0,
      100,
      100,
      0,
      0,
    ],
    (err) => {
      if (err) {
        console.error("Failed to insert game:", err);
      } else {
        console.log("Test game inserted successfully.");
      }
    }
  );
});
