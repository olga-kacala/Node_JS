const db = require('../db/database');

class Game {
  constructor(side) {
    this.gameId = `game-${Date.now()}`;
    this.status = 'initialized';
    this.side = side;
    this.turn = 0;
    this.userHealth = 100;
    this.opponentHealth = 100;
    this.attackHP = 0;
  }

  async save() {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO games (gameId, status, side, turn, userHealth, opponentHealth, attackHP) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.run(query, [this.gameId, this.status, this.side, this.turn, this.userHealth, this.opponentHealth, this.attackHP], function (err) {
        if (err) return reject(err);
        resolve({ gameId: this.gameId });
      });
    });
  }

  static findById(gameId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM games WHERE gameId = ?";
      db.get(query, [gameId], (err, game) => {
        if (err) return reject(err);
        resolve(game);
      });
    });
  }

  static async updateHealth(gameId, userHealth, opponentHealth, turn, status, attackHP) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE games SET userHealth = ?, opponentHealth = ?, turn = ?, status = ?, attackHP = ? WHERE gameId = ?";
      db.run(query, [userHealth, opponentHealth, turn, status, attackHP, gameId], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = Game;
