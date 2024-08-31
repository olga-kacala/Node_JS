const request = require("supertest");
const express = require("express");
const jwt = require("./utils/jwt");
const User = require("./classes/User");
const Game = require("./classes/Game");

const app = require("./server"); 

jest.mock("./classes/User");
jest.mock("./classes/Game");
jest.mock("./utils/jwt");

describe("API Endpoints", () => {
  const secret = process.env.JWT_SECRET;

  describe("POST /api/v1/register", () => {
    it("should register a new user", async () => {
      const mockUser = { username: "testuser", password: "password123" };
      User.prototype.save = jest.fn().mockResolvedValue({});

      const res = await request(app).post("/api/v1/register").send(mockUser);

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual("User registered successfully");
    });

    it("should return 400 if username or password is missing", async () => {
      const res = await request(app).post("/api/v1/register").send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual("Username and password are required");
    });
  });

  describe("POST /api/v1/login", () => {
    it("should login user and return a token", async () => {
      const mockUser = { id: 1, username: "testuser", password: "hashedpassword" };
      const mockToken = "mocktoken";
      User.findByUsername = jest.fn().mockResolvedValue(mockUser);
      User.comparePassword = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(mockToken);

      const res = await request(app).post("/api/v1/login").send({ username: "testuser", password: "password123" });

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toEqual(mockToken);
    });

    it("should return 401 if username or password is incorrect", async () => {
      User.findByUsername = jest.fn().mockResolvedValue(null);

      const res = await request(app).post("/api/v1/login").send({ username: "wronguser", password: "wrongpassword" });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual("Invalid username or password");
    });
  });

  describe("POST /api/v1/startGame", () => {
    it("should start a game", async () => {
      const mockGame = { gameId: 1, status: "started" };
      Game.prototype.save = jest.fn().mockResolvedValue(mockGame);

      const res = await request(app).post("/api/v1/startGame").send({ side: "X" });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ gameId: mockGame.gameId, status: mockGame.status });
    });

    it("should return 400 if side is missing", async () => {
      const res = await request(app).post("/api/v1/startGame").send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual("Side is required");
    });
  });

  describe("POST /api/v1/attack", () => {
    it("should perform an attack move", async () => {
      const mockGame = {
        id: 1,
        userHealth: 100,
        opponentHealth: 50,
        turn: 1,
        status: "ongoing"
      };
      Game.findById = jest.fn().mockResolvedValue(mockGame);
      Game.updateHealth = jest.fn().mockResolvedValue();

      const res = await request(app).post("/api/v1/attack").send({ gameId: 1, attackHP: 20 });

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual("Attack successful");
      expect(res.body.userHealth).toBeLessThanOrEqual(mockGame.userHealth);
      expect(res.body.opponentHealth).toBeLessThanOrEqual(mockGame.opponentHealth);
    });

    it("should return 400 if game ID or HP is missing", async () => {
      const res = await request(app).post("/api/v1/attack").send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual("Game ID and HP is required");
    });
  });

 
});
