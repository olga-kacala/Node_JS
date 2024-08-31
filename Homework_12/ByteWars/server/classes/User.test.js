const bcrypt = require('bcrypt');
const User = require('./User'); // Adjust the path as needed
const db = require('../db/database');

jest.mock('../db/database'); // Mock the database module
jest.mock('bcrypt'); // Mock bcrypt for password hashing and comparison

describe('User Class', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe('User.hashPassword()', () => {
    it('should hash a password with bcrypt', async () => {
      bcrypt.hash.mockResolvedValue('hashedPassword'); // Mock bcrypt hash

      const hashed = await User.hashPassword('myPassword');

      expect(hashed).toBe('hashedPassword');
      expect(bcrypt.hash).toHaveBeenCalledWith('myPassword', 10);
    });
  });

  describe('User.save()', () => {
    it('should save a new user with hashed password to the database', async () => {
      const mockHashedPassword = 'hashedPassword';
      bcrypt.hash.mockResolvedValue(mockHashedPassword); // Mock bcrypt hash
      db.run.mockImplementation((query, params, callback) => {
        callback(null); // Simulate success
        this.lastID = 1; // Mock the ID returned after insert
      });

      const user = new User('testUser', 'testPassword');
      const result = await user.save();

      expect(result).toEqual({ userId: 1 });
      expect(db.run).toHaveBeenCalledWith(
        expect.any(String), // query
        ['testUser', mockHashedPassword],
        expect.any(Function) // callback
      );
    });

    it('should throw an error when failing to save a new user', async () => {
      bcrypt.hash.mockResolvedValue('hashedPassword'); // Mock bcrypt hash
      db.run.mockImplementation((query, params, callback) => {
        callback(new Error('Failed to save user'));
      });

      const user = new User('testUser', 'testPassword');

      await expect(user.save()).rejects.toThrow('Failed to save user');
    });
  });

  describe('User.findByUsername()', () => {
    it('should find a user by username', async () => {
      const mockUser = {
        userId: 1,
        username: 'testUser',
        password: 'hashedPassword',
      };

      db.get.mockImplementation((query, params, callback) => {
        callback(null, mockUser); // Simulate successful retrieval
      });

      const user = await User.findByUsername('testUser');

      expect(user).toEqual(mockUser);
      expect(db.get).toHaveBeenCalledWith(
        expect.any(String), // query
        ['testUser'],
        expect.any(Function) // callback
      );
    });

    it('should throw an error if the user is not found', async () => {
      db.get.mockImplementation((query, params, callback) => {
        callback(new Error('User not found'));
      });

      await expect(User.findByUsername('non-existent')).rejects.toThrow(
        'User not found'
      );
    });
  });

  describe('User.comparePassword()', () => {
    it('should return true for matching passwords', async () => {
      bcrypt.compare.mockResolvedValue(true); // Mock bcrypt compare

      const isMatch = await User.comparePassword(
        'inputPassword',
        'storedPassword'
      );

      expect(isMatch).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'inputPassword',
        'storedPassword'
      );
    });

    it('should return false for non-matching passwords', async () => {
      bcrypt.compare.mockResolvedValue(false); // Mock bcrypt compare

      const isMatch = await User.comparePassword(
        'wrongPassword',
        'storedPassword'
      );

      expect(isMatch).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongPassword',
        'storedPassword'
      );
    });
  });

  describe('User.deleteAll()', () => {
    it('should delete all users from the database', async () => {
      db.run.mockImplementation((query, callback) => {
        callback(null); // Simulate success
        this.changes = 3; // Mock number of rows affected
      });

      const result = await User.deleteAll();

      expect(result).toBe(3);
      expect(db.run).toHaveBeenCalledWith(
        expect.any(String), // query
        expect.any(Function) // callback
      );
    });

    it('should throw an error when failing to delete all users', async () => {
      db.run.mockImplementation((query, callback) => {
        callback(new Error('Failed to delete users'));
      });

      await expect(User.deleteAll()).rejects.toThrow('Failed to delete users');
    });
  });
});
